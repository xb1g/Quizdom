import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  Platform,
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
  const { width, height } = Dimensions.get("window");

  const scrollViewRef = useRef(null);

  const {
    mapData,
    selectedMapName,
    setSelectedMapName,
    selectedMapModulesData,
    selectedModule,
    setSelectedModule,
    loaded,
  } = useContext(MapsContext);

  const translateY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  const toModule = (top) => {
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        y: top,
        animated: true,
      });
    }
  };

  // useEffect(() => {
  //   console.log("j");
  //   console.log(height * 1.8 + 600, width);
  //   toModule(250);
  // }, [loaded]);

  return (
    <View style={{ flexGrow: 1 }}>
      <BackButton
        navigation={navigation}
        onPress={() => {
          setSelectedMapName("");
          navigation.goBack();
        }}
        // onPress={() => setSelectedModule(null)}
      />
      <HeaderText title={`${selectedMapName}`} />
      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ backgroundColor: "#8f4700" }}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        // bounces={false}
      >
        {/* {Platform.OS === "ios" && (
          <View
            style={{
              backgroundColor: "red",
              height: 500,
              position: "absolute",
              top: -500,
              left: 0,
              right: 0,
            }}
          />
        )} */}
        {/* <View style={{ height: height * 1.8 + 600 }} /> */}
        <Image
          source={require("./bgsetmap.png")}
          style={{
            width: width,
            height: 3000,
            top: -500,
          }}
        />
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "red",
            position: "absolute",
            top: 500,
            left: 400,
          }}
        />
        {selectedMapModulesData &&
          selectedMapModulesData.map((module) => (
            <ModuleButton
              scrollTo={toModule}
              key={module.name + String(module.id)}
              translateY={translateY}
              {...module}
            />
          ))}
      </Animated.ScrollView>
      {selectedModule && (
        <View
          style={{
            flex: 1,
          }}
          // onPressOut={() => setSelectedModule(null)}
        >
          <View
            style={{
              position: "absolute",
              bottom: insets.bottom,
              ...shadow.shadow2,
              zIndex: 11,
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
        </View>
      )}
    </View>
  );
};
