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

const ContentContainer = styled.View`
  flex-direction: row;
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
  background-color: ${(props) => props.theme.colors.bg.inverse};
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
  const [description, setDescription] = React.useState("");
  // const { resource } = useContext(ResourceContext);
  useEffect(() => {
    console.log("resourace");
    // console.log(selectedModule.name);
    // console.log(setsResources[selectedModule.name]);
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
        {/* <Description>{description}</Description> */}
        {/* <Spacer size={30} /> */}
        <View>
          <Text
            style={{
              fontSize: 28,
              color: theme.colors.brand.secondary,
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
                <>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(item.link);
                    }}
                  >
                    <ContentContainer>
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
                          {item.time + "  from  " + item.author}
                        </Text>
                      </Column>
                    </ContentContainer>
                  </TouchableOpacity>
                </>
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
              color: "#138000",
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
                <>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(item.link);
                    }}
                  >
                    <ContentContainer>
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
                    </ContentContainer>
                  </TouchableOpacity>
                </>
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
        <View>
          <QuizStartItem onPress={() => navigation.navigate("Quiz")}>
            <Text>QUIZ</Text>
          </QuizStartItem>
        </View>
      </SafeTop>
    </View>
  );
}
