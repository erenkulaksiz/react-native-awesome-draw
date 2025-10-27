import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: true, title: "Examples" }}
        />
        <Stack.Screen
          name="basicExample"
          options={{ title: "Basic Example" }}
        />
        <Stack.Screen name="viewOnly" options={{ title: "View Only" }} />
        <Stack.Screen
          name="animation"
          options={{ title: "Animated Example" }}
        />
        <Stack.Screen
          name="groupOpacity"
          options={{ title: "Group Opacity" }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
