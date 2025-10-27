import { View } from "react-native";
import { Canvas } from "react-native-awesome-draw";

import path from "@/assets/helloPath.json";

/*
  This example shows how to use the Canvas component with a static path.

  You can store path data anywhere, its essentially just an array of objects with a path, stroke color and stroke width.
*/
export default function ViewOnly() {
  return (
    <View style={{ flex: 1 }}>
      <Canvas paths={path} isDrawingEnabled={false} />
    </View>
  );
}
