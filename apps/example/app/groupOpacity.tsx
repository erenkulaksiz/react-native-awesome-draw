import { useState } from "react";
import { View } from "react-native";
import { Canvas, type PathData } from "react-native-awesome-draw";

/*
  This example shows how to use the Canvas component with a group opacity.
  Multiple paths with opacity can be used to create a group of paths with a single opacity.
*/
export default function GroupOpacity() {
  const [paths, setPaths] = useState<PathData[]>([]);

  return (
    <View style={{ flex: 1 }}>
      <Canvas
        paths={paths}
        onDrawEnd={(path) => setPaths((prev) => [...prev, path])}
        groupProps={{ opacity: 0.5 }}
        isGroup
        strokeWidth={24}
        strokeColor="#ff0000"
      />
    </View>
  );
}
