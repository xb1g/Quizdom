import React from "react";
import { View } from "react-native";
import Constants from "expo-constants";
import Svg, { G, Circle, Rect } from "react-native-svg";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularProgress = ({
  percentage = 75,
  radius = 50,
  strokeWidth = 20,
  duration = 500,
  color = "tomato",
  delay = 0,
  textColor,
  max = 100,
}) => {
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const progress = useSharedValue(0);

  // React.useEffect(() => {
  //   progress.value = withTiming(1, { duration: duration });
  // }, []);

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        {/* <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}> */}
        <Circle
          // ref={circleRef}
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          // strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.4}
        />
        <Circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeOpacity=".1"
        />
        {/* </G> */}
      </Svg>
    </View>
  );
};
