import { useEffect } from "react";
import { View } from "react-native";
import { LivePath } from "react-native-awesome-draw";
import {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";
import Svg from "react-native-svg";
import path from "@/assets/helloSingle.json";

/*
  This example shows how to use the LivePath component to animate a path.
  LivePath is just a wrapper around the SVG Path component that allows us to animate the path with react-native-reanimated.
  We can use the useSharedValue and withTiming to animate the strokeDashoffset of the path.

  Remember: react-native-awesome-draw is not an animating library, I do not recommend using it for animations.
  Checkout lottie or skia for animations.
*/
export default function Animation() {
  const progress = useSharedValue(0);
  const pathLength = 2500; // Adjust this value based on your actual path length

  useEffect(() => {
    progress.value = withTiming(1, { duration: 3000 });
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: pathLength * (1 - progress.value),
    };
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Svg width="100%" height="100%">
        <LivePath
          d={path[0].p}
          stroke={path[0].sc}
          strokeWidth={path[0].sw}
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={pathLength}
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
}
