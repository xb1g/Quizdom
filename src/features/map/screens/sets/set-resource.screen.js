import React, { useContext, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { Text } from "../../../../components/typography/text.component";
import { BackButton } from "../../../../components/button/back-button.component";
//import { HeaderText } from "../../../components/utility/header-text.component";
import { MapsContext } from "../../../../services/maps/maps.context";
import { Button, List } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { SafeTop } from "../../../../components/utility/safe-area.component";
import styled, { useTheme } from "styled-components/native";
import AwesomeButtonC from "react-native-really-awesome-button/src/themes/c137";
import { HeaderText } from "../../../../components/utility/header-text.component";
import { ResourceContext } from "../../../../services/resource/resource.context";
import { setsResources } from "../../../../services/data/math/sets";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  LightSpeedInLeft,
  LightSpeedOutRight,
} from "react-native-reanimated";
import {
  AskButton,
  QuizButton,
} from "../../../home/components/today/today.component";
import { inlineStyles } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Row } from "../../../../components/utility/row.component";
// import { resourceData } from "../../../services/data/math/sets/sets.json";

const Column = styled.View`
  flex-direction: column;
  max-width: 90%;
`;

const ContentContainer = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.bg.tertiary};
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
  margin-top: 10px;
`;

const Description = styled(Text)`
  margin-top: 10px;
  margin-left: auto;
  padding: 10px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.inverse};
`;

const ItemContainer = styled.View`
  border-radius: 25px;
  margin: 10px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const QuizStartItem = styled(TouchableOpacity)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.brand.primary};
  border-radius: 20px;
  margin: ${(props) => props.theme.space[3]};
  margin-left: auto;
`;

const ResourceItem = ({ item, theme }) => {
  return (
    <Animated.View entering={FadeInDown.delay(200)} exiting={FadeOutDown}>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(item.link);
        }}
      >
        <ContentContainer>
          {item.type === "video" ? (
            <Ionicons
              name="play-circle"
              size={35}
              color={theme.colors.logo.secondary}
            />
          ) : (
            <Ionicons
              name="reader"
              size={35}
              color={theme.colors.logo.primary}
            />
          )}
          <Spacer position={"left"} size="medium" />
          <Spacer position={"left"} size="medium" />
          <Column>
            <Text variant="titleInverse" numberOfLines={2}>
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 2,
                color: "#d1d1d1",
              }}
            >
              {item.time + "  from  " + item.author}
            </Text>
          </Column>
        </ContentContainer>
      </TouchableOpacity>
    </Animated.View>
  );
};

export function SetResourceScreen({ navigation }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { selectedModule } = useContext(MapsContext);
  const [resourceData, setResourceData] = React.useState([]);
  const [resourceAdditional, setResourceAdditional] = React.useState([]);
  const [description, setDescription] = React.useState("");
  // const { resource } = useContext(ResourceContext);
  useEffect(() => {
    setResourceData(setsResources[selectedModule.name]["important"]);
    setResourceAdditional(setsResources[selectedModule.name]["additional"]);
    setDescription(setsResources[selectedModule.name]["description"]);
  }, [selectedModule]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.bg.primary,
      }}
    >
      <BackButton navigation={navigation} />
      <SafeTop>
        <Spacer
          position={"left"}
          style={{
            marginLeft: 300,
          }}
        />
        <Text
          variant="label"
          adjustsFontSizeToFit
          style={{
            color: "white",
            fontSize: 40,
            marginLeft: "auto",
            maxWidth: "90%",
          }}
          numberOfLines={5}
        >
          {selectedModule.name + " "}
        </Text>

        <View>
          <Text
            style={{
              fontSize: 28,
              color: theme.colors.accent.tertiarym,
              paddingLeft: 30,
              paddingTop: 20,
            }}
          >
            Important
          </Text>
        </View>
        <ItemContainer>
          {resourceData ? (
            <FlatList
              data={resourceData}
              renderItem={({ item }) => (
                <ResourceItem item={item} theme={theme} />
              )}
              keyExtractor={(item) => item.title + item.author}
            />
          ) : (
            <ContentContainer>
              <Text>No Resource</Text>
            </ContentContainer>
          )}
        </ItemContainer>
        <Spacer size="large" />
        <View>
          <Text
            style={{
              fontSize: 28,
              color: theme.colors.accent.secondarym,
              paddingLeft: 30,
            }}
          >
            Additional
          </Text>
        </View>
        <ItemContainer>
          {resourceAdditional ? (
            <FlatList
              data={resourceAdditional}
              renderItem={({ item }) => (
                <ResourceItem item={item} theme={theme} />
              )}
              keyExtractor={(item) => item.title + item.link[0]}
            />
          ) : (
            <ContentContainer>
              <Text>No Resource</Text>
            </ContentContainer>
          )}
          <Spacer size={theme.space[3]} />
        </ItemContainer>
        <Row
          style={{
            flex: 1,
            alignContent: "flex-end",
            justifyContent: "flex-end",
            alignSelf: "flex-end",
            alignItems: "flex-end",
            margin: 20,
            marginBottom: insets.bottom + 20,
          }}
        >
          <View style={{ flex: 0.5 }}>
            <AskButton theme={theme} />
          </View>
          <View style={{ flex: 0.05 }} />
          <View style={{ flex: 0.5 }}>
            <QuizButton
              onPress={() => navigation.navigate("Quiz")}
              theme={theme}
            />
          </View>
        </Row>
      </SafeTop>
    </View>
  );
}
