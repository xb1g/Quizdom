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

// import { resourceData } from "../../../services/data/math/sets/sets.json";

const Column = styled.View`
  flex-direction: column;
  max-width: 90%;
`;

const QuizStartItem = styled(TouchableOpacity)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.brand.primary};
  border-radius: 20px;
  margin: ${(props) => props.theme.space[3]};
  margin-left: auto;
`;

export function SetResourceScreen({ navigation }) {
  const theme = useTheme();
  const { selectedModule } = useContext(MapsContext);
  const [resourceData, setResourceData] = React.useState([]);
  const [resourceAdditional, setResourceAdditional] = React.useState([]);
  // const { resource } = useContext(ResourceContext);
  useEffect(() => {
    console.log("resourace");
    console.log(selectedModule.name);
    console.log(setsResources[selectedModule.name]);
    setResourceData(setsResources[selectedModule.name]["important"]);
    setResourceAdditional(setsResources[selectedModule.name]["additional"]);
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
        <Spacer size={30} />
        <View style={{ flex: 0, backgroundColor: "#393939", marginTop: 50 }}>
          <Text
            style={{
              fontSize: 28,
              color: "#D0421B",
              paddingLeft: 30,
              paddingTop: 20,
            }}
          >
            Important
          </Text>
        </View>
        <View
          style={{
            margin: 20,
            marginTop: 10,
            backgroundColor: "#fff",
            borderRadius: 20,
          }}
        >
          {resourceData ? (
            <FlatList
              data={resourceData}
              renderItem={({ item }) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(item.link);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        margin: 10,
                        marginTop: 10,
                        padding: 10,
                        alignItems: "center",
                      }}
                    >
                      {item.type === "video" ? (
                        <Ionicons
                          name="play-circle-outline"
                          size={28}
                          color={theme.colors.accent.quaternary}
                        />
                      ) : (
                        <Ionicons
                          name="reader"
                          size={28}
                          color={theme.colors.accent.secondary}
                        />
                      )}
                      <Spacer position={"left"} size="medium" />
                      <Spacer position={"left"} size="medium" />
                      <Column>
                        <Text numberOfLines={2}>{item.title}</Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#555555",
                          }}
                        >
                          {item.time}
                        </Text>
                      </Column>
                    </View>
                  </TouchableOpacity>
                </>
              )}
              keyExtractor={(item) => item.title + item.link[0]}
            />
          ) : (
            <View>
              <Text>No Resource</Text>
            </View>
          )}
        </View>
        <View style={{ flex: 0, backgroundColor: "#393939" }}>
          <Text
            style={{
              fontSize: 28,
              color: "#138000",
              paddingLeft: 30,
            }}
          >
            Additional
          </Text>
        </View>
        <View
          style={{
            margin: 20,
            marginTop: 10,
            backgroundColor: "#fff",
            borderRadius: 20,
          }}
        >
          {resourceAdditional ? (
            <FlatList
              data={resourceAdditional}
              renderItem={({ item }) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(item.link);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        margin: 10,
                        marginTop: 10,
                        padding: 10,
                        alignItems: "center",
                      }}
                    >
                      {item.type === "video" ? (
                        <Ionicons
                          name="play-circle-outline"
                          size={28}
                          color={theme.colors.accent.quaternary}
                        />
                      ) : (
                        <Ionicons
                          name="reader"
                          size={28}
                          color={theme.colors.accent.secondary}
                        />
                      )}
                      <Spacer position={"left"} size="medium" />
                      <Spacer position={"left"} size="medium" />
                      <Column>
                        <Text numberOfLines={2}>{item.title}</Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#555555",
                          }}
                        >
                          {item.description}
                        </Text>
                      </Column>
                    </View>
                  </TouchableOpacity>
                </>
              )}
              keyExtractor={(item) => item.title + item.link[0]}
            />
          ) : (
            <View>
              <Text>No Resource</Text>
            </View>
          )}
          <Spacer size={theme.space[3]} />
        </View>
        <View style={{ flex: 0, backgroundColor: "#393939" }}>
          <QuizStartItem onPress={() => navigation.navigate("Quiz")}>
            <Text>QUIZ</Text>
          </QuizStartItem>
        </View>
      </SafeTop>
    </View>
  );
}
