import { Fragment, useCallback, useMemo, type FC } from "react";
import {
  Gesture,
  GestureDetector,
  type GestureStateChangeEvent,
  type PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { useAnimatedProps, useSharedValue } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import Svg, { G } from "react-native-svg";
import { SavedPaths, LivePath } from "../Path";
import { pathToPoints, pointsToPath, simplifyPath } from "../../lib/math";
import type { CanvasProps } from "./Canvas.types";

export default function Canvas({
  paths,
  isDrawingEnabled = true,
  isPathOptimized = false,
  strokeColor = "black",
  strokeWidth = 5,
  livePathProps,
  svgProps,
  savedPathsProps,
  onDrawStart = () => {},
  onDrawEnd = () => {},
  distanceThreshold: DISTANCE_THRESHOLD = 5,
  isGroup = false,
  groupProps,
}: CanvasProps) {
  const currentPathString = useSharedValue("");
  const isDrawing = useSharedValue(false);
  const lastX = useSharedValue(0);
  const lastY = useSharedValue(0);

  const GroupWrapper = useCallback(
    ({ children }: { children: React.ReactNode }) => {
      if (isGroup) {
        return <G {...groupProps}>{children}</G>;
      }

      return <Fragment>{children}</Fragment>;
    },
    [isGroup, groupProps]
  );

  const savedPaths = useMemo(() => {
    if (!paths) return null;

    return <SavedPaths paths={paths} {...savedPathsProps} />;
  }, [paths, savedPathsProps]);

  const animatedProps = useAnimatedProps(() => {
    return {
      d: currentPathString.value,
    };
  });

  const savePathCallback = useCallback(() => {
    if (!isPathOptimized) {
      onDrawEnd?.({
        p: currentPathString.value,
        sc: strokeColor,
        sw: strokeWidth,
      });

      currentPathString.value = "";

      return;
    }

    // #TODO: run optimization func in worklet
    const points = pathToPoints(currentPathString.value);

    if (points.length < 3) return;

    const tolerance = Math.max(2, strokeWidth / 10);
    const simplifiedPoints = simplifyPath(points, tolerance);
    const simplifiedPath = pointsToPath(simplifiedPoints);

    onDrawEnd?.({
      p: simplifiedPath,
      sc: strokeColor,
      sw: strokeWidth,
    });

    currentPathString.value = "";
  }, [strokeColor, strokeWidth, onDrawEnd, isPathOptimized]);

  const onStartCallback = useCallback(
    (e: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
      "worklet";
      if (!isDrawingEnabled) return;

      isDrawing.value = true;
      lastX.value = e.x;
      lastY.value = e.y;
      currentPathString.value = `M${e.x},${e.y}`;

      scheduleOnRN(onDrawStart);
    },
    [isDrawingEnabled, onDrawStart]
  );

  const onUpdateCallback = useCallback(
    (e: PanGestureHandlerEventPayload) => {
      "worklet";
      if (!isDrawing.value || !isDrawingEnabled) return;

      const dx = e.x - lastX.value;
      const dy = e.y - lastY.value;
      const distanceSquared = dx * dx + dy * dy;
      const thresholdSquared = DISTANCE_THRESHOLD * DISTANCE_THRESHOLD;

      if (distanceSquared >= thresholdSquared) {
        currentPathString.value += `L${e.x},${e.y}`;
        lastX.value = e.x;
        lastY.value = e.y;
      }
    },
    [isDrawingEnabled]
  );

  const onEndCallback = useCallback(() => {
    "worklet";
    isDrawing.value = false;

    if (!isDrawingEnabled) return;

    scheduleOnRN(savePathCallback);
  }, [isDrawingEnabled, savePathCallback, onDrawEnd]);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .minDistance(0)
        .onStart(onStartCallback)
        .onUpdate(onUpdateCallback)
        .onEnd(onEndCallback),
    [savePathCallback, onStartCallback, onUpdateCallback, onEndCallback]
  );

  return (
    <GestureDetector gesture={panGesture}>
      <Svg width="100%" height="100%" {...svgProps}>
        <GroupWrapper>
          {savedPaths}
          <LivePath
            animatedProps={animatedProps}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            {...livePathProps}
          />
        </GroupWrapper>
      </Svg>
    </GestureDetector>
  );
}
