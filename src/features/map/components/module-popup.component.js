import React, { useContext } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import AwesomeButton from "react-native-really-awesome-button/src/themes/rick";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { shadow } from "../../../components/shadow/shadow.styles";
import { Text } from "../../../components/typography/text.component";
import { MapsContext } from "../../../services/maps/maps.context";

// const CircularProgress = () => {
//   return (
//     <View>
//       <Text>CircularProgress</Text>
//     </View>
//   );
// };

export function ModulePopup({ moduleName, navigation }) {
  const insets = useSafeAreaInsets();
  const { selectedModule } = useContext(MapsContext);
  return (
    <View
      style={{
        backgroundColor: "#fff",
        height: 200,
        width: Dimensions.get("window").width - 20,
        borderRadius: 30,
        marginHorizontal: 10,
        padding: 20,
        justifyContent: "space-between",
        ...shadow.shadow1,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          //   marginBottom: "auto",
        }}
      >
        {selectedModule}
      </Text>
      <CircularProgress
        value={60}
        activeStrokeColor={"#2465FD"}
        activeStrokeSecondaryColor={"#C25AFF"}
        activeStrokeWidth={20}
        inActiveStrokeColor="#3c005f"
        inActiveStrokeWidth={20}
        textColor="red"
        showProgressValue={false}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("QuizNavigator")}
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          zIndex: 10,
        }}
      >
        <Text variant="label" style={{ fontSize: 100 }}>
          {">> "}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
