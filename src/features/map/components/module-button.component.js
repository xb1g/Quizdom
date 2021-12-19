import React, { useContext, useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Dimensions } from "react-native";
import { Text } from "../../../components/typography/text.component";
import CircularProgress, {
  CircularProgressWithChild,
} from "react-native-circular-progress-indicator";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { MapsContext } from "../../../services/maps/maps.context";
// const CircularProgressWithChild = () => {
//   return (
//     <View>
//       <Text>CircularProgressWithChild</Text>
//     </View>
//   );
// };

export function ModuleButton({
  color,
  position,
  completedAt,
  latestAt,
  startedAt,
  reviewAt,
  name,
  style,
  value,
  id,
  translateY,
}) {
  const { height, width } = Dimensions.get("window");
  const top = position.top * height;
  const left = position.left * width;
  const { setSelectedModule } = useContext(MapsContext);
  const [onFocus, setOnFocus] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const limitHrs = (reviewAt.seconds - latestAt.seconds) / 60 / 60;
      const nowAt = new Date().getTime() / 1000;
      const nowHrs = nowAt / 60 / 60;
      const passedHrs = nowHrs - latestAt.seconds / 60 / 60;
      // console.log(limitHrs, passedHrs);
      // console.log("S", (passedHrs / limitHrs) * 100);
      setProgress(100 - (passedHrs / limitHrs) * 100);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const module = {
    name,
    id,
  };

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.abs(translateY.value - top),
      [(height - 40) / 2 / 5, (height - 40) / 2 + 0, height - 40],
      [0.8, 1.2, 0.8],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }],
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          backgroundColor: color,
          top: top + 40 || 150,
          left: left || 100,
          width: 70,
          height: 70,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          ...style,
        },
        rStyle,
      ]}
    >
      <TouchableOpacity
        // onPress={() => setSelectedModule(module)}
        onPress={() => {
          console.log(reviewAt.seconds / 60 / 60 - latestAt.seconds / 60 / 60);
          // print the time difference between now and latest in hours
          console.log(
            "PASSES",
            (new Date().getTime() / 1000 - latestAt.seconds) / 60 / 60
          );
          //print the time between reviewAt and latestAt in hours

          console.log(progress);
          setSelectedModule(module);
          // console.log(top, translateY.value);
          // setOnFocus(true);
        }}
      >
        <CircularProgress
          activeStrokeColor={"#467dff"}
          activeStrokeSecondaryColor={"#b535ff"}
          activeStrokeWidth={25}
          inActiveStrokeWidth={20}
          value={progress > 0 ? progress : 70}
          radius={60}
          showProgressValue={true}
          circleBackgroundColor={"#76ffc6"}
        />
        <View
          style={{
            position: "absolute",
            left: left < width / 2 ? 120 : -90,
            top: 20,
            zIndex: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
            }}
          >
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
