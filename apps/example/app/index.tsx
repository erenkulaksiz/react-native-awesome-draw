import { useState } from "react";
import { View, Button, TouchableOpacity, Text } from "react-native";
import { Canvas, type PathData } from "react-native-awesome-draw";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { bottom, top } = useSafeAreaInsets();

  const [paths, setPaths] = useState<PathData[]>([]);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(true);
  const [isPathOptimized, setIsPathOptimized] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(8);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: top + 16,
        paddingBottom: bottom + 16,
      }}
    >
      <View style={{ gap: 10, padding: 16 }}>
        <Button
          title={isDrawingEnabled ? "Disable Drawing" : "Enable Drawing"}
          onPress={() => {
            setIsDrawingEnabled((prev) => !prev);
          }}
        />
        <Button
          title={
            isPathOptimized
              ? "Disable Path Optimization"
              : "Enable Path Optimization"
          }
          onPress={() => {
            setIsPathOptimized((prev) => !prev);
          }}
        />
        <Button
          title="Clear"
          onPress={() => {
            setPaths([]);
            console.log("paths cleared");
          }}
        />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {Array.from({ length: 14 }).map((_, index) => {
            const item = (index + 1) * 2;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => setStrokeWidth(item)}
              >
                <Text
                  style={{
                    color: strokeWidth === item ? "black" : "gray",
                    fontWeight: strokeWidth === item ? "bold" : "normal",
                  }}
                >
                  {(index + 1) * 2}px
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <Canvas
        paths={paths}
        onDrawStart={() => {
          console.log("draw start");
        }}
        onDrawEnd={(path) => setPaths((prev) => [...prev, path])}
        isDrawingEnabled={isDrawingEnabled}
        isPathOptimized={isPathOptimized}
        strokeWidth={strokeWidth}
      />
    </View>
  );
}
