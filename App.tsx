
import {Text, View} from 'react-native';

import { NativeWindStyleSheet } from "nativewind";


NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function App() {
  return (
    <View className={"w-full bg-white px-6 py-24 sm:py-32 lg:px-8"}>
        <View className={"mx-auto max-w-2xl text-center"}>
            <Text className={"text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"}>Expo Tailwind Boilerplate</Text>
            <Text className={"mt-6 text-lg leading-8 text-gray-600"}>
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
            </Text>
        </View>
    </View>
  );
}


