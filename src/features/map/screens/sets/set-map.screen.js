import React, { useContext, useState } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
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

export const SetMapScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  // const [modules, setModules] = useState([]);
  const { mapData, mapName, modulesData } = useContext(MapsContext);
  // get modules from firebase
  // need skill level progress
  // these are appearance
  // const Modules = [
  //   {
  //     color: theme.colors.brand.secondary,
  //     top: windowHeight * 0.1,
  //     left: windowWidth * 0.1,
  //     moduleName: "Basic of Set",
  //     id: 1,
  //   },
  //   {
  //     color: theme.colors.brand.primary,
  //     top: windowHeight * 0.3,
  //     left: windowWidth * 0.3,
  //     moduleName: "Venn diagram",
  //     id: 2,
  //   },
  //   {
  //     color: theme.colors.brand.primary,
  //     top: windowHeight * 0.5,
  //     left: windowWidth * 0.2,
  //     moduleName: "Venn diagram",
  //     id: 3,
  //   },
  //   {
  //     color: theme.colors.brand.primary,
  //     top: windowHeight * 0.5,
  //     left: windowWidth * 0.6,
  //     moduleName: "Venn diagram",
  //     id: 4,
  //   },
  //   {
  //     color: theme.colors.brand.primary,
  //     top: windowHeight * 0.7,
  //     left: windowWidth * 0.5,
  //     moduleName: "shit diagram",
  //     id: 5,
  //   },
  //   {
  //     color: theme.colors.brand.primary,
  //     top: windowHeight * 0.9,
  //     left: windowWidth * 0.3,
  //     moduleName: "Venn diagram",
  //     id: 6,
  //   },
  //   {
  //     color: theme.colors.brand.primary,
  //     top: windowHeight * 1.1,
  //     left: windowWidth * 0.2,
  //     moduleName: "Venn diagram",
  //     id: 7,
  //   },
  //   {
  //     color: theme.colors.brand.primary,
  //     top: windowHeight * 1.3,
  //     left: windowWidth * 0.3,
  //     moduleName: "Venn diagram",
  //     id: 8,
  //   },
  // ];

  // const [popupShown, setPopupShown] = React.useState(null);
  const { selectedModule, setSelectedModule } = useContext(MapsContext);
  const translateY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  return (
    <View style={{ flexGrow: 1 }}>
      <BackButton navigation={navigation} />
      <HeaderText title={`${mapName}`} />

      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ backgroundColor: "#8f4700" }}
      >
        {/* <View> */}
        {/* <CircularProgress value={58} /> */}
        <View style={{ height: windowHeight * 1.8 }} />
        {modulesData.map((module) => (
          <ModuleButton
            // name={module.name}
            // id={module.id}
            // key={module.name + module.id}
            // color={module.color}
            // position={module.position}
            translateY={translateY}
            {...module}
          />
        ))}

        {/* </View> */}
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
              top: 10,
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
          <ModulePopup
            moduleName={selectedModule.moduleName}
            navigation={navigation}
          />
        </View>
      )}
    </View>
  );
};
