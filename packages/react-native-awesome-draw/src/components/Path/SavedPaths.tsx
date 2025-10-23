import { memo } from "react";
import { Path } from "react-native-svg";
import type { PathData } from "@/types";

export interface SavedPathsProps {
  paths: PathData[];
}

function SavedPaths({ paths, ...props }: SavedPathsProps) {
  return paths.map((path, index) => (
    <Path
      key={`p-${index}`}
      d={path.p}
      stroke={path.sc}
      strokeWidth={path.sw}
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
      {...props}
    />
  ));
}

export default memo(SavedPaths);
