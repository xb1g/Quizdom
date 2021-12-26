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
  started,
  completedAt,
  latestAt,
  startedAt,
  reviewAt,
  name,
  style,
  value,
  id,
  translateY,
  progress,
  unlocked,
}) {
  const { height, width } = Dimensions.get("window");
  const top = position.top * height;
  const left = position.left * width;
  const { setSelectedModule, modulesData } = useContext(MapsContext);
  const [onFocus, setOnFocus] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);

  useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        const limitHrs = (reviewAt.seconds - latestAt.seconds) / 60 / 60;
        // console.log(reviewAt.seconds, latestAt.seconds, limitHrs);
        // console.log(reviewAt.seconds - latestAt.seconds, "ASD");
        const nowAt = new Date().getTime() / 1000;
        const nowHrs = nowAt / 60 / 60;
        const passedHrs = nowHrs - latestAt.seconds / 60 / 60;
        // console.log(limitHrs, passedHrs);
        // console.log("S", (passedHrs / limitHrs) * 100);
        setTimeProgress(100 - (passedHrs / limitHrs) * 100);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      console.log("not started");
    }
  }, []);

  const module = {
    name,
    id,
    unlocked,
  };

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.abs(translateY.value - top - 80),
      [0, height / 2 - 150, height],
      [0.5, 1.1, 0.5],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }],
    };
  });

  // if (!started) {
  //   return (
  //     <View style={{ width: 50, height: 50, backgroundColor: "#8f4700" }} />
  //   );
  // } else {
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
          if (!started) {
            console.log("make progress on db and show module");
            const module = modulesData.find((module) => module.id === id);

            if (module.unlocked) {
              //start
              //show modal
            }
            setSelectedModule(module);
            return;
          }
          console.log(reviewAt.seconds / 60 / 60 - latestAt.seconds / 60 / 60);
          // print the time difference between now and latest in hours
          console.log(
            "PASSES",
            progress,
            (new Date().getTime() / 1000 - latestAt.seconds) / 60 / 60
          );

          console.log(timeProgress);
          setSelectedModule(module);
        }}
      >
        <CircularProgressWithChild
          activeStrokeColor={"#467dff"}
          activeStrokeSecondaryColor={"#b535ff"}
          activeStrokeWidth={25}
          inActiveStrokeWidth={25}
          value={timeProgress > 0 ? timeProgress : 0}
          radius={60}
          showProgressValue={false}
          // circleBackgroundColor={"#76ffc6"}
        >
          <View
            style={{
              backgroundColor: unlocked ? "#71ffd0" : "grey",
              borderRadius: 100,
              width: 65,
              height: 65,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              variant="label"
              style={{
                fontSize: 36,
                marginLeft: 5,
                zIndex: 100,
              }}
            >
              {progress + " "}
            </Text>
          </View>
        </CircularProgressWithChild>
        <View
          style={{
            position: "absolute",
            left: left < width / 2 ? 120 : -90,
            top: 20,
            zIndex: 10,
            width: 100,
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
// }
