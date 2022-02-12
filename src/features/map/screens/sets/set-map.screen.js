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
  BounceOutDown,
  ZoomIn,
  RotateInDownLeft,
  FlipInEasyX,
} from "react-native-reanimated";
import { ActivityIndicator, Button } from "react-native-paper";
import Svg, { Line } from "react-native-svg";
import { MapLine } from "../../components/map-line.component";
import { requirements } from "../../../../services/data/math/sets/modules";

export const SetMapScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { width, height } = Dimensions.get("window");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    // console.log("setmap");
    // console.log(selectedMapModulesData);
  }, [selectedMapModulesData]);

  const translateY = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  const toModule = (top) => {
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        y: top - 200,
        animated: true,
      });
    }
  };

  if (loading && loaded)
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <ActivityIndicator
          animating={true}
          color={theme.colors.accent.tertiary}
          size="large"
        />
      </View>
    );
  else
    return (
      <Animated.View style={{ flexGrow: 1 }}>
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
          // contentContainerStyle={{ backgroundColor: "#8f4700" }}
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          style={{
            flexGrow: 1,
          }}
          // bounces={false}
        >
          {Platform.OS === "ios" && (
            <>
              <View
                style={{
                  backgroundColor: "#96FF00",
                  height: 500,
                  position: "absolute",
                  top: -1000,
                  left: 0,
                  right: 0,
                }}
              />
              <View
                style={{
                  backgroundColor: "#00C9FF",
                  height: 1500,
                  position: "absolute",
                  top: 2000,
                  left: 0,
                  right: 0,
                }}
              />
            </>
          )}
          {/* <View style={{ height: height * 1.8 + 600 }} /> */}
          <Image
            source={require("./bgsetmap.png")}
            onLoadStart={() => {
              setLoading(true);
              console.log("loading");
            }}
            onLoad={() => {
              setLoading(false);
              console.log("loaded");
            }}
            style={{
              width: width,
              height: 3000,
              top: -800,
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
          {selectedMapModulesData && (
            <MapLine
              modules={selectedMapModulesData}
              requirements={requirements}
            />
          )}
        </Animated.ScrollView>
        {selectedModule && (
          <Animated.View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                position: "absolute",
                bottom: insets.bottom,
                ...shadow.shadow2,
                zIndex: 11,
              }}
            >
              <ModulePopup
                module={selectedModule}
                navigation={navigation}
                setSelectedModule={setSelectedModule}
              />
            </View>
          </Animated.View>
        )}
      </Animated.View>
    );
};
