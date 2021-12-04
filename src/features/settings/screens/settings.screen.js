import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import styled, { useTheme } from "styled-components/native";
import { SafeTop } from "../../../components/utility/safe-area.component";
import { BackButton } from "../../../components/button/back-button.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
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
  const [volumeValue, setVolumeValue] = useState(100);
  const [musicValue, setMusicValue] = useState(100);
  const [sfxValue, setSfxValue] = useState(100);
  const [voiceValue, setVoiceValue] = useState(100);
  const [switchValue, setSwitchValue] = useState(1);
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
            left={(props) => <List.Icon {...props} icon="volume-high" />}
            onPress={() => {
              console.log("pressed");
            }}
          />
          <View style={stylestxt.container}>
            <Text>Master volume : {volumeValue}</Text>
          </View>
          <View style={styles.container}>
            <Slider
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#ffaadd"
              maximumTrackTintColor="#38b6ff"
              thumbTintColor="#fde78e"
              step={1}
              value={volumeValue}
              onValueChange={(value) => setVolumeValue(value)}
              //onValueChange={(value) => console.log({ volumeValue })}
            />
          </View>
          <View style={stylestxt.container}>
            <Text>Music : {musicValue}</Text>
          </View>
          <View style={styles.container}>
            <Slider
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#ffaadd"
              maximumTrackTintColor="#38b6ff"
              thumbTintColor="#fde78e"
              step={1}
              value={musicValue}
              onValueChange={(value) => setMusicValue(value)}
              //onValueChange={(value) => console.log({ musicValue })}
            />
          </View>
          <View style={stylestxt.container}>
            <Text>Sound effects : {sfxValue}</Text>
          </View>
          <View style={styles.container}>
            <Slider
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#ffaadd"
              maximumTrackTintColor="#38b6ff"
              thumbTintColor="#fde78e"
              step={1}
              value={sfxValue}
              onValueChange={(value) => setSfxValue(value)}
              //onValueChange={(value) => console.log({ sfxValue })}
            />
          </View>
          <View style={stylestxt.container}>
            <Text>Chandy's voice : {voiceValue}</Text>
          </View>
          <View style={styles.container}>
            <Slider
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#ffaadd"
              maximumTrackTintColor="#38b6ff"
              thumbTintColor="#fde78e"
              step={1}
              value={voiceValue}
              onValueChange={(value) => setVoiceValue(value)}
              //onValueChange={(value) => console.log({ voiceValue })}
            />
          </View>
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
          <View style={stylestxt.container}>
            <Text>Do not disturb</Text>
          </View>
          <View style={styles.container}>
            <Switch
              value={switchValue}
              thumbColor="#fde78e"
              onValueChange={(value) => setSwitchValue(value)}
            />
          </View>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
    alignItems: "stretch",
    justifyContent: "center",
  },
});
const stylestxt = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 10,
    alignItems: "stretch",
    justifyContent: "center",
    color: "#ffffff",
  },
});
