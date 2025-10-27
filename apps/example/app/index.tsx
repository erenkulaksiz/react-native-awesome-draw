import { useRouter } from "expo-router";
import { Button, View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContainer,
          { paddingBottom: bottom + 16 },
        ]}
      >
        <Button
          title="Basic Example"
          onPress={() => router.push("/basicExample")}
        />
        <Button title="View Only" onPress={() => router.push("/viewOnly")} />
        <Button
          title="Animated Example"
          onPress={() => router.push("/animation")}
        />
        <Button
          title="Group Opacity"
          onPress={() => router.push("/groupOpacity")}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    gap: 16,
  },
});
