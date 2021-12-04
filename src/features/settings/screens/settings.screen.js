import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import styled, { useTheme } from "styled-components/native";
import { SafeTop } from "../../../components/utility/safe-area.component";
import { BackButton } from "../../../components/button/back-button.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 10px;
  margin-bottom: ${(props) => props.theme.space[3]};
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
`;

export function SettingsScreen({ navigation }) {
  const theme = useTheme();
  return (
    <>
      <BackButton navigation={navigation} />
      <SafeTop>
        <Spacer />
        <Text
          variant="label"
          style={{ color: "white", fontSize: 60, marginLeft: "auto" }}
        >
          {"Settings" + " "}
        </Text>
        <ScrollView>
          <SettingsItem
            style={{
              backgroundColor: theme.colors.bg.primary,
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
          />
          <SettingsItem
            title="Notification setting"
            left={(props) => <List.Icon {...props} icon="folder" />}
            onPress={() => {
              console.log("pressed");
            }}
          />
          <SettingsItem
            title="Email and Password setting"
            left={(props) => <List.Icon {...props} icon="folder" />}
            onPress={() => {
              console.log("pressed");
            }}
          />
          <SettingsItem
            title="Sign out"
            left={(props) => <List.Icon {...props} icon="folder" />}
            onPress={() => {
              console.log("pressed");
            }}
          />
          <SettingsItem
            title="Term of service and Privacy policy"
            left={(props) => <List.Icon {...props} icon="folder" />}
            onPress={() => {
              console.log("pressed");
            }}
          />
        </ScrollView>
      </SafeTop>
    </>
  );
}
