import React, { useContext } from "react";
import { Image, View, TouchableOpacity, Dimensions } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
// import Icon from "react-native-ionicons";
// import { Icon } from "../../../components/icon/icon.component";
import styled from "styled-components/native";

import { Ionicons } from "@expo/vector-icons";
import { Text } from "../../../components/typography/text.component";
import { BackButton } from "../../../components/button/back-button.component";
// import Pie from "react-native-pie";
import { ModuleButton } from "../components/module-button.component";
import { useTheme } from "styled-components";
import { HeaderText } from "../../../components/utility/header-text.component";
// import { ModulePopup } from "../../quiz/screens/module-popup.screen";
import { ModulePopup } from "../components/module-popup.component";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { shadow } from "../../../components/shadow/shadow.styles";
import { MapsContext } from "../../../services/maps/maps.context";

export const SetMapScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const { selectedModule, setSelectedModule } = useContext(MapsContext);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [popupShown, setPopupShown] = React.useState(null);
  // console.log(theme);
  // React.useEffect(() => {
  //   // console.log(popupShown);
  // }, [popupShown]);
  return (
    <View style={{ flexGrow: 1 }}>
      <BackButton navigation={navigation} />
      <HeaderText
        title={`Set`}
        // style={{ position: "absolute", backgroundColor: "transparent" }}
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "#8f4700" }}
      >
        {/* <View> */}
        <View style={{ flexGrow: 1, height: windowHeight * 2 }} />
        <ModuleButton
          navigation={navigation}
          color={theme.colors.brand.primary}
          top={windowHeight * 0.1}
          left={windowWidth * 0.1}
          moduleName={"Basic"}
        />
        <ModuleButton
          navigation={navigation}
          color={theme.colors.brand.primary}
          top={windowHeight * 0.3}
          left={windowWidth * 0.3}
          // onPress={() => {
          //   setPopupShown("module2");
          //   console.log("asdas");
          //   console.log(popupShown);
          // }}
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
            navigation={navigation}
            moduleName={selectedModule}
            onClose={() => setPopupShown(null)}
          />
        </View>
      )}
    </View>
  );
};
