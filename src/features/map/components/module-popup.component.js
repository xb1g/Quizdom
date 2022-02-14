import React, { useContext, useEffect } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";

import moment from "moment";
import { MotiView } from "moti";
import Animated, {
  AnimatedLayout,
  BounceInDown,
  BounceInUp,
  BounceOutDown,
  Layout,
} from "react-native-reanimated";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { shadow } from "../../../components/shadow/shadow.styles";
import { Text } from "../../../components/typography/text.component";
import { MapsContext } from "../../../services/maps/maps.context";
import { Row } from "../../../components/utility/row.component";

export function ModulePopup({ module, navigation, setSelectedModule }) {
  const { selectedMapModulesData } = useContext(MapsContext);
  useEffect(() => {
    // console.log("modulesss");
  }, [selectedMapModulesData]);
  const currentModule = selectedMapModulesData.find((x) => x.id == module.id);
  const insets = useSafeAreaInsets();

  return (
    <MotiView
      key={module.id + module.name}
      from={{ scale: 0.9, translateY: 100 }}
      animate={{ scale: 1, translateY: 0 }}
      exit={{ scale: 0, translateY: -100 }}
      transition={{
        type: "spring",
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 10,
        }}
        onPress={() => {
          setSelectedModule(null);
        }}
      >
        <Text
          variant="label"
          style={{
            fontSize: 40,
          }}
        >
          {"x "}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: currentModule.unlocked ? "#fff" : "#aaaaaa",
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
              {"/4 "}
            </Text>
          </Row>
          <Text
            style={{
              fontSize: 22,
              marginLeft: -26,
            }}
          >
            {module.name}
          </Text>
        </Row>
        {currentModule.reviewAt && (
          <Row>
            <Text>{"To quiz "}</Text>
            <Text>{moment(currentModule.reviewAt.toDate()).fromNow()}</Text>
          </Row>
        )}

        {!currentModule.unlocked && <Text>locked!</Text>}
        <TouchableOpacity
          onPress={() =>
            currentModule.unlocked && navigation.navigate("QuizNavigator")
          }
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            zIndex: 10,
          }}
        >
          <Text
            variant="label"
            style={{
              fontSize: 100,
              color: currentModule.unlocked ? "#000" : "#999",
            }}
          >
            {">> "}
          </Text>
        </TouchableOpacity>
      </View>
    </MotiView>
  );
}
