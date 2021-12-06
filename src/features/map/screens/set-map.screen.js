import React from "react";
import { Image, View, TouchableOpacity, Dimensions } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
// import Icon from "react-native-ionicons";
// import { Icon } from "../../../components/icon/icon.component";
import styled from "styled-components/native";

import { Ionicons } from "@expo/vector-icons";
import { Text } from "../../../components/typography/text.component";
import { BackButton } from "../../../components/button/back-button.component";
// import Pie from "react-native-pie";
import CircularProgress from "react-native-circular-progress-indicator";
import { ModuleButton } from "../components/module-button.component";
import { useTheme } from "styled-components";
import { HeaderText } from "../../../components/utility/header-text.component";

export const SetMapScreen = ({ navigation }) => {
  const theme = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  console.log(theme);
  return (
    <View style={{ flexGrow: 1 }}>
      <BackButton navigation={navigation} />
      <HeaderText
        title={`Set Map`}
        // style={{ position: "absolute", backgroundColor: "transparent" }}
      />

      <ScrollView
        // style={{ backgroundColor: "#432", flexGrow: 1 }}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "#241d16" }}
      >
        {/* <View> */}
        <View style={{ flexGrow: 1, height: windowHeight * 2 }} />
        <ModuleButton
          navigation={navigation}
          color={theme.colors.brand.primary}
          top={windowHeight * 0.1}
          left={windowWidth * 0.1}
        />
        <ModuleButton
          navigation={navigation}
          color={theme.colors.brand.primary}
          top={windowHeight * 0.3}
          left={windowWidth * 0.3}
        />
        <ModuleButton
          navigation={navigation}
          color={theme.colors.brand.primary}
          top={windowHeight * 0.5}
          left={windowWidth * 0.5}
        />
        <ModuleButton
          navigation={navigation}
          color={theme.colors.brand.secondary}
          top={windowHeight * 0.7}
          left={windowWidth * 0.4}
        />
        <ModuleButton
          navigation={navigation}
          color={theme.colors.brand.secondary}
          top={windowHeight * 0.9}
          left={windowWidth * 0.4}
        />
        <ModuleButton
          navigation={navigation}
          color={theme.colors.brand.secondary}
          top={windowHeight * 1.1}
          left={windowWidth * 0.4}
        />
        {/* </View> */}
      </ScrollView>
    </View>
  );
};
