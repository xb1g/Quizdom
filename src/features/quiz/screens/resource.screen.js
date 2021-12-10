import React, { useContext } from "react";
import { View, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { BackButton } from "../../../components/button/back-button.component";
//import { HeaderText } from "../../../components/utility/header-text.component";
import { MapsContext } from "../../../services/maps/maps.context";
import { List } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeTop } from "../../../components/utility/safe-area.component";
import styled, { useTheme } from "styled-components/native";
import AwesomeButtonC from "react-native-really-awesome-button/src/themes/c137";
import { HeaderText } from "../../../components/utility/header-text.component";

const ResourceItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 15px;
  margin-bottom: ${(props) => props.theme.space[3]};
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
`;
const QuizStartItem = styled(TouchableOpacity)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.brand.primary};
  border-radius: 20px;
  margin: ${(props) => props.theme.space[3]};
  margin-left: auto;
`;
_handleResource = () => {
  Linking.openURL("https://www.youtube.com/watch?v=CjIJm_beh5M");
};
export function ResourceScreen({ navigation }) {
  const theme = useTheme();
  const { selectedModule } = useContext(MapsContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.bg.primary,
      }}
    >
      <HeaderText
        title={selectedModule}
        style={{
          color: "#245",
        }}
      />
      <BackButton navigation={navigation} />
      <SafeTop />
      <View style={{ flex: 1, marginTop: 50 }}>
        <ResourceItem
          titleStyle={{
            color: theme.colors.brand.primary,
            fontSize: 20,
          }}
          title={"React native crud"}
          left={(props) => <List.Icon {...props} icon="play" />}
          onPress={this._handleResource}
        />
      </View>
      <View style={{ flex: 0, backgroundColor: "#393939" }}>
        <QuizStartItem onPress={() => navigation.navigate("Quiz")}>
          <Text>QUIZ</Text>
        </QuizStartItem>
      </View>
    </View>
  );
}
