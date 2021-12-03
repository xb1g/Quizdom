import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import styled, { useTheme } from "styled-components/native";
import { SafeTop } from "../../../components/utility/safe-area.component";
import { BackButton } from "../../../components/button/back-button.component";
import { Text } from "../../../components/typography/text.component";
import { Slider } from "@miblanchard/react-native-slider";
import { View, Switch, StyleSheet } from "react-native";

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
  const [
    volumeValue,
    setVolumeValue,
    sfxVolumeValue,
    setSfxVolumeValue,
    voiceVolumeValue,
    setVoiceVolumeValue,
  ] = useState(100);
  const [isEnabled, setIsEnabled] = useState(False);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
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
              backgroundColor: theme.colors.bg.primary  ,
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
          <Text>Music volume : {volumeValue}</Text>
          <Slider
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#ffaadd"
            maximumTrackTintColor="#38b6ff"
            thumbTintColor="#fde78e"
            step={1}
            value={volumeValue}
            onValueChange={(value) => setVolumeValue(value)}
          />

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
          <Text>Do not disturb mode</Text>
          {/* <View>
            <Switch
              trackColor={{ false: "#ffaadd", true: "#38b6ff" }}
              thumbColor={isEnabled ? "#fde78e" : "#fde78e"}
              backgroundColor="#d9d9d9"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View> */}
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
