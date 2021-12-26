import React, { useContext, useState } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
// import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
// import Icon from "react-native-ionicons";
// import { Icon } from "../../../components/icon/icon.component";
import styled, { useTheme } from "styled-components/native";

import { Ionicons } from "@expo/vector-icons";
import { Text } from "../../../../components/typography/text.component";
import { BackButton } from "../../../../components/button/back-button.component";
// import Pie from "react-native-pie";
// import { ModuleButton } from "../components/module-button.component";
import { HeaderText } from "../../../../components/utility/header-text.component";
// import { ModulePopup } from "../../quiz/screens/module-popup.screen";
import { ModulePopup } from "../../components/module-popup.component";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { shadow } from "../../../../components/shadow/shadow.styles";
import { ModuleButton } from "../../components/module-button.component";
import { CircularProgress } from "../../../../components/visualization/circular-progress.component";
import { MapsContext } from "../../../../services/maps/maps.context";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Button } from "react-native-paper";

export const SetMapScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const { mapData, mapName, modulesData } = useContext(MapsContext);

  // const [popupShown, setPopupShown] = React.useState(null);
  const { selectedModule, setSelectedModule } = useContext(MapsContext);
  const translateY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  return (
    <View style={{ flexGrow: 1 }}>
      <BackButton navigation={navigation} />
      {/* <Modal transparent={true} animationType="slide" visible={false}>
        <Text>Hello</Text>
      </Modal> */}
      {/* <Button
        style={{
          position: "absolute",
          top: 100,
          right: 0,
          zIndex: 101,
          backgroundColor: theme.colors.primary,
          width: 100,
          height: 100,
        }}
        onPress={() => {
          console.log("onpress");
          const time = new Date();
          console.log(time, new Date(time.getTime() + 1000));
          const module = modulesData.find((x) => x.id == selectedModule.id);
          console.log(module);
          console.log("onpress");
        }}
      >
        assd assd assd
      </Button> */}
      <HeaderText title={`${mapName}`} />

      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ backgroundColor: "#8f4700" }}
      >
        <View style={{ height: windowHeight * 1.8 }} />

        {modulesData.map((module) => (
          <ModuleButton
            key={module.name + String(module.id)}
            translateY={translateY}
            {...module}
          />
        ))}
      </Animated.ScrollView>
      {selectedModule && (
        <View
          style={{
            position: "absolute",
            bottom: insets.bottom,
            ...shadow.shadow2,
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              zIndex: 10,
            }}
            onPress={() => setSelectedModule(null)}
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
          <ModulePopup module={selectedModule} navigation={navigation} />
        </View>
      )}
    </View>
  );
};
