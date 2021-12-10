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

const ResourceItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 50px;
  margin-bottom: ${(props) => props.theme.space[3]};
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
`;
const QuizStartItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.brand.primary};
  border-radius: 20px;
  margin-bottom: ${(props) => props.theme.space[3]};
  margin-left: ${(props) => props.theme.space[0]};
  margin-right: ${(props) => props.theme.space[0]};
`;

export function ResourceScreen({ navigation }) {
  const theme = useTheme();
  const { selectedModule } = useContext(MapsContext);
  return (
    <>
      <SafeTop>
        <Spacer />
        <View style={{ flex: 1, backgroundColor: "#393939" }}>
          <BackButton navigation={navigation} />
          <View /*style={styles.container}*/>
            <Text
              variant="label"
              style={{
                color: "white",
                fontSize: 36,
                marginLeft: 60,
                marginTop: 50,
              }}
            >
              {"Study" + " " + "Resources"}
            </Text>
          </View>
          <ResourceItem
            style={{
              backgroundColor: theme.colors.bg.secondary,
              borderRadius: 20,
              marginHorizontal: 10,
              marginTop: 20,
            }}
            titleStyle={{
              color: theme.colors.brand.primary,
              fontSize: 20,
            }}
            title={"https://www.google.co.th/?hl=th"}
          />
        </View>
        <View style={{ flex: 0, backgroundColor: "#393939" }}>
          <Text
            style={{
              color: "#ffffff",
              marginBottom: 20,
              fontsize: 25,
              marginLeft: 20,
            }}
          >
            {selectedModule}
          </Text>

          <TouchableOpacity>
            <QuizStartItem
              style={{
                backgroundColor: "#ffc8ff",
                marginLeft: 225,
                paddingRight: 10,
                borderRadius: 20,
                marginTop: 20,
                marginBottom: 50,
              }}
              titleStyle={{
                color: "white",
                fontSize: 28,
              }}
              title={"Start" + " " + "Quiz" + " " + ">"}
              onPress={() => {
                console.log("Quiz Begin");
              }}
            />
          </TouchableOpacity>
        </View>
      </SafeTop>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    alignItems: "stretch",
    justifyContent: "center",
  },
});
