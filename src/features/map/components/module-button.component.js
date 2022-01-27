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
import { shadow } from "../../../components/shadow/shadow.styles";

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
  scrollTo,
}) {
  const { height, width } = Dimensions.get("window");
  const top = position.top;
  const left = position.left;
  const { setSelectedModule, selectedMapModulesData, updated, selectedModule } =
    useContext(MapsContext);
  const [timeProgress, setTimeProgress] = useState(0);

  useEffect(() => {
    if (started && progress) {
      const interval = setInterval(() => {
        const limitHrs = (reviewAt.seconds - latestAt.seconds) / 60 / 60;
        const nowAt = new Date().getTime() / 1000;
        const nowHrs = nowAt / 60 / 60;
        const passedHrs = nowHrs - latestAt.seconds / 60 / 60;
        setTimeProgress(100 - (passedHrs / limitHrs) * 100);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      // // console.log("not started", module.name);
    }
  }, [updated]);

  const module = {
    name,
    id,
    unlocked,
  };

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.abs(translateY.value - top - 200),
      [0, height / 2, height],
      [0.5, 1.2, 0.5],
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
          top: top,
          left: left,
          width: 70,
          height: 70,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
          ...style,
        },
        rStyle,
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          scrollTo(top - 200);
          if (!started) {
            const module = selectedMapModulesData.find(
              (module) => module.id === id
            );

            setSelectedModule(module);
            return;
          }
          setSelectedModule(module);
        }}
      >
        <CircularProgressWithChild
          activeStrokeColor={"#467dff"}
          activeStrokeSecondaryColor={"#b535ff"}
          activeStrokeWidth={25}
          inActiveStrokeWidth={25}
          value={timeProgress > 0 ? timeProgress : 0}
          radius={
            selectedModule
              ? selectedModule.name === module.name
                ? 80
                : 60
              : 60
          }
          showProgressValue={false}
          // circleBackgroundColor={"#76ffc6"}
        >
          <View
            style={{
              backgroundColor: unlocked
                ? progress === 0
                  ? "#fff492"
                  : progress === 1
                  ? "#64edff"
                  : progress === 2
                  ? "#5cffae"
                  : progress === 3
                  ? "#91ff76"
                  : "#ffd700"
                : "grey",
              borderRadius: 100,
              width: selectedModule
                ? selectedModule.name === module.name
                  ? 65
                  : 60
                : 60,
              height: selectedModule
                ? selectedModule.name === module.name
                  ? 65
                  : 60
                : 60,
              justifyContent: "center",
              alignItems: "center",
              ...shadow.shadow2,
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
              ...shadow.shadow2,
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
