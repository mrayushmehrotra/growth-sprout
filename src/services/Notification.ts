import * as Notification from "expo-notifications";

async function registerForPushNotificationAsync() {
  const { status: existingStatus } = await Notification.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notification.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for push Notification");
    return;
  }

  const token = (await Notification.getExpoPushTokenAsync()).data;
  console.log(token);
  Notification.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  return token;
}
