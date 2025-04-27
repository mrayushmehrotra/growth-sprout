import {
  Text,
  View,
  Image,
  SafeAreaView,
  Pressable,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { useState, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const [active, setActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [customMinutes, setCustomMinutes] = useState("25");
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token),
    );

    // Listen for incoming notifications
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
      });

    // Listen for notification responses
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Register for push notifications
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Expo Push Token:", token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Schedule notification
  const scheduleNotification = async (seconds) => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Timer Started!",
        body: `Your ${Math.floor(seconds / 60)} minute timer has Started`,
        sound: "default",
        data: { timerFinished: true },
      },
      trigger: { seconds: seconds },
    });

    console.log("Notification scheduled with ID:", notificationId);
    return notificationId;
  };

  // Handle timer start/stop
  const toggleTimer = async () => {
    if (active) {
      // Stop timer
      clearInterval(timerId);
      await Notifications.cancelAllScheduledNotificationsAsync();
      setActive(false);
    } else {
      // Start timer
      const minutes = parseInt(customMinutes) || 25;
      if (minutes <= 0) {
        Alert.alert(
          "Invalid Time",
          "Please enter a positive number of minutes",
        );
        return;
      }

      const seconds = minutes * 60;
      setTimeLeft(seconds);

      // Schedule notification
      await scheduleNotification(seconds);

      const id = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(id);
            setActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      setTimerId(id);
      setActive(true);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId);
      Notifications.cancelAllScheduledNotificationsAsync();
    };
  }, [timerId]);

  return (
    <SafeAreaView
      className={
        "w-full flex justify-between items-end h-screen bg-[#f2f2f2] px-6 py-24 sm:py-32 lg:px-8"
      }
    >
      <View className={"mx-auto max-w-2xl text-center w-full"}>
        <Pressable onPress={toggleTimer}>
          <Image
            source={require("./assets/tomato.jpg")}
            className={"h-[30vh] w-[80vw] mx-auto"}
          />
        </Pressable>

        <View className="mt-4">
          <Text className="text-lg font-semibold mb-2">
            Set Timer Duration (minutes):
          </Text>
          <TextInput
            className="border border-gray-400 rounded p-2 text-center text-lg mb-4"
            keyboardType="numeric"
            value={customMinutes}
            onChangeText={setCustomMinutes}
            editable={!active}
          />
        </View>

        <Text className="text-4xl font-bold mt-4">{formatTime(timeLeft)}</Text>

        <Text className="mt-4 text-lg">
          {active
            ? "Timer is running..."
            : timeLeft === 0
              ? "Set time and click tomato to start"
              : "Timer paused"}
        </Text>

        <Pressable
          onPress={toggleTimer}
          className={`mt-6 p-3 rounded-lg ${active ? "bg-red-500" : "bg-green-500"}`}
        >
          <Text className="text-white text-lg font-bold">
            {active ? "Stop Timer" : "Start Timer"}
          </Text>
        </Pressable>
        <View className="mt-[10vh]"></View>
        <View className="absolute bottom-0 bg-zinc-400 p-2 w-full">
          <Text className="text-center text-xs">
            This project is in development mode, might contain some restrictions
            and bugs
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
