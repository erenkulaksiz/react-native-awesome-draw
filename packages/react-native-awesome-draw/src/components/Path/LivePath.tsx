import Animated from "react-native-reanimated";
import { Path, type PathProps } from "react-native-svg";

const LivePath = Animated.createAnimatedComponent<PathProps>(Path);

export default LivePath;
