import React, { useContext, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { Text } from "../../../../components/typography/text.component";
import { BackButton } from "../../../../components/button/back-button.component";
//import { HeaderText } from "../../../components/utility/header-text.component";
import { MapsContext } from "../../../../services/maps/maps.context";
import { List } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { SafeTop } from "../../../../components/utility/safe-area.component";
import styled, { useTheme } from "styled-components/native";
import AwesomeButtonC from "react-native-really-awesome-button/src/themes/c137";
import { HeaderText } from "../../../../components/utility/header-text.component";
import { ResourceContext } from "../../../../services/resource/resource.context";
import { setResource } from "../../../../services/data/math/sets";
import { FlatList } from "react-native-gesture-handler";

// import { resourceData } from "../../../services/data/math/sets/sets.json";

const ResourceItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
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

export function SetResourceScreen({ navigation }) {
  const theme = useTheme();
  const { selectedModule } = useContext(MapsContext);
  const [resourceData, setResourceData] = React.useState([]);
  // const { resource } = useContext(ResourceContext);
  useEffect(() => {
    console.log("resourace");
    console.log(selectedModule.moduleName);

    console.log(setResource[selectedModule.moduleName][1]);

    setResourceData(setResource[selectedModule.moduleName][1]);
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
        <Text
          variant="label"
          style={{ color: "white", fontSize: 40, marginLeft: "auto" }}
        >
          {selectedModule.moduleName + " "}
        </Text>
        <Spacer size={30} />
        <View
          style={{
            margin: 30,
            backgroundColor: "#b4b4b4",
            padding: 10,
            borderRadius: 20,
          }}
        >
          <FlatList
            data={resourceData}
            renderItem={({ item }) => (
              <ResourceItem
                title={item.title}
                description={item.description}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={item.type === "video" ? "play-circle" : "book"}
                  />
                )}
                onPress={() => {
                  Linking.openURL(item.link);
                }}
              />
            )}
            keyExtractor={(item) => item.title}
          />
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
