import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
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
  top,
  left,
  style,
  moduleName,
  value,
  id,
  translateY,
}) {
  const { setSelectedModule } = useContext(MapsContext);
  const module = {
    moduleName,
    id,
  };
  const { height } = Dimensions.get("window");
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
          translateY.value = top;
          console.log(top, translateY.valueP);
        }}
      >
        <CircularProgress
          activeStrokeColor={"#467dff"}
          activeStrokeSecondaryColor={"#b535ff"}
          activeStrokeWidth={20}
          inActiveStrokeWidth={20}
          value={Math.random() * 100}
          radius={60}
          showProgressValue={false}
        ></CircularProgress>
      </TouchableOpacity>
    </Animated.View>
  );
}
