import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import styled from "styled-components/native";
import { SafeTop } from "../../../components/utility/safe-area.component";
import { BackButton } from "../../../components/button/back-button.component";
import { Text } from "../../../components/typography/text.component";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

export function SettingsScreen({ navigation }) {
  return (
    <SafeTop>
      {/* <SafeTop /> */}
      <BackButton navigation={navigation} />
      <Text
        variant="label"
        style={{ color: "white", fontSize: 60, marginLeft: "auto" }}
      >
        {"Settings" + " "}
      </Text>
      <ScrollView>
        <SafeTop>
          <SettingsItem
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.068)",
              borderRadius: 10,
              marginHorizontal: 10,
            }}
            titleStyle={{
              color: "white",
            }}
            title="Audio setting"
            left={(props) => <List.Icon {...props} icon="folder" />}
            onPress={() => {
              console.log("pressed");
            }}
            title="Notification setting"
            left={(props) => <List.Icon {...props} icon="folder" />}
            onPress={() => {
              console.log("pressed");
            }}
            title="Email and Password setting"
            left={(props) => <List.Icon {...props} icon="folder" />}
            onPress={() => {
              console.log("pressed");
            }}
            
            title="Sign out"
            left={(props) => <List.Icon {...props} icon="folder" />}
            onPress={() => {
              console.log("pressed");
            }}
            title="Term of service and Privacy policy"
            left={(props) => <List.Icon {...props} icon="folder" />}
            onPress={() => {
              console.log("pressed");
            }}
          />
        </SafeTop>
      </ScrollView>
    </SafeTop>
  );
}
