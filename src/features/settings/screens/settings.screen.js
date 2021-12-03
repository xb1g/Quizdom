import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import styled, { useTheme } from "styled-components/native";
import { SafeTop } from "../../../components/utility/safe-area.component";
import { BackButton } from "../../../components/button/back-button.component";
import { Text } from "../../../components/typography/text.component";
import { Slider } from "@miblanchard/react-native-slider";

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
  const [volumeValue, setVolumeValue] = useState(100);
  return (
    <>
      <BackButton navigation={navigation} />
      <SafeTop>
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
            left={(props) => <List.Icon {...props} icon="volume-high" />}
            onPress={() => {
              console.log("pressed");
            }}
          />
          <Slider
            minimumValue={0}
            maximumValue={100}
            step={100}
            value={volumeValue}
            onValueChange={(value) => setVolumeValue(value)}
          />
          <Text>Value: {volumeValue}</Text>
          <SettingsItem
            titleStyle={{
              color: "white",
            }}
            title="Notification setting"
            left={(props) => <List.Icon {...props} icon="bell" />}
            onPress={() => {
              console.log("pressed");
            }}
          />
          <SettingsItem
            titleStyle={{
              color: "white",
            }}
            title="Email and Password setting"
            left={(props) => <List.Icon {...props} icon="wrench" />}
            onPress={() => {
              console.log("pressed");
            }}
          />
          <SettingsItem
            titleStyle={{
              color: "white",
            }}
            title="Sign out"
            left={(props) => <List.Icon {...props} icon="logout" />}
            onPress={() => {
              console.log("pressed");
            }}
          />
          <SettingsItem
            titleStyle={{
              color: "white",
            }}
            title="Term of service and Privacy policy"
            left={(props) => <List.Icon {...props} icon="mail" />}
            onPress={() => {
              console.log("pressed");
            }}
          />
        </ScrollView>
      </SafeTop>
    </>
  );
}
