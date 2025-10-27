import type { GProps, PathProps, SvgProps } from "react-native-svg";
import type { PathData } from "../../types";
import type { SavedPathsProps } from "../Path/SavedPaths";

export interface CanvasProps {
  paths?: PathData[];
  distanceThreshold?: number;
  isDrawingEnabled?: boolean;
  isPathOptimized?: boolean;
  isGroup?: boolean;

  // Props
  livePathProps?: Omit<PathProps, "animatedProps">;
  savedPathsProps?: Omit<SavedPathsProps, "paths">;
  svgProps?: SvgProps;
  groupProps?: GProps;

  // Stroke-related props
  strokeColor?: string;
  strokeWidth?: number;

  // Callbacks
  onDrawStart?: () => void;
  onDrawEnd?: (path: PathData) => void;
}
