import React, { useContext, useEffect } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import AwesomeButton from "react-native-really-awesome-button/src/themes/rick";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { shadow } from "../../../components/shadow/shadow.styles";
import { Text } from "../../../components/typography/text.component";
import { MapsContext } from "../../../services/maps/maps.context";
import moment from "moment";
import { Row } from "../../../components/utility/row.component";

// const CircularProgress = () => {
//   return (
//     <View>
//       <Text>CircularProgress</Text>
//     </View>
//   );
// };

export function ModulePopup({ module, navigation }) {
  const { mapData, mapName, modulesData } = useContext(MapsContext);
  useEffect(() => {
    console.log("modulesss");
    console.log("modulesss", modulesData);
  }, [modulesData]);
  const currentModule = modulesData.find((x) => x.id == module.id);
  const insets = useSafeAreaInsets();
  console.log();
  return (
    <View
      style={{
        backgroundColor: "#fff",
        height: 200,
        width: Dimensions.get("window").width - 20,
        borderRadius: 30,
        margin: 10,
        padding: 20,
        justifyContent: "space-between",
        ...shadow.shadow1,
      }}
    >
      <Row>
        <Row
          style={{
            marginTop: -10,
            alignItems: "flex-end",
          }}
        >
          <Text
            variant={"label"}
            style={{
              fontSize: 56,
              color: "#000000",
            }}
          >
            {currentModule.progress + " "}
          </Text>
          <Text
            variant={"label"}
            style={{
              position: "absolute",
              top: 2,
              left: 2,
              zIndex: -1,
              fontSize: 56,
              color: "#6af5ff",
            }}
          >
            {currentModule.progress + " "}
          </Text>
          <Text
            variant={"label"}
            style={{
              marginLeft: -20,
              marginBottom: -5,
              fontSize: 26,
            }}
          >
            {"/10 "}
          </Text>
        </Row>
        <Text
          style={{
            fontSize: 22,
            marginLeft: -36,
          }}
        >
          {module.name}
        </Text>
      </Row>
      <Text>To quiz</Text>
      <Text>{moment(currentModule.reviewAt.toDate()).fromNow()}</Text>

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
