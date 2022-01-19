import React, { useEffect, useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Dimensions,
  TouchableHighlight,
  FlatList,
} from "react-native";
import styled, { useTheme } from "styled-components/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Text } from "../../../components/typography/text.component";
import { Button } from "../../../features/planner/components/button.component";
import { shadow } from "../../../components/shadow/shadow.styles";
import { ScrollView } from "react-native-gesture-handler";
import { Row } from "../../../components/utility/row.component";
import { db } from "../../../../firebase-config";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { Spacer } from "../../../components/spacer/spacer.component";
import { MapsContext } from "../../../services/maps/maps.context";

const MapPlanContainer = styled(View)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 30px;
  padding: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
  margin-left: ${(props) => props.theme.space[3]};
`;

const ModuleContainer = styled(View)`
  /* background-color: "#fff"; */
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const PlannerScreen = ({ navigation }) => {
  const theme = useTheme();
  const { width, height } = Dimensions.get("window");
  const { allModules } = useContext(MapsContext);
  const [maps, setMaps] = useState([]);
  useEffect(() => {
    console.log("casdask");
    console.log(allModules);
    const allNames = Object.keys(allModules);
    const saveModules = [];
    allNames.forEach((name) => {
      const module = allModules[name];
      console.log("ASD", module);
      saveModules.push(module);
    });
    setMaps(saveModules);
  }, [allModules]);
  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.bg.primary }}>
        <Spacer size="extraLarge" />
        <Spacer size="extraLarge" />
        <Spacer size="extraLarge" />
        <Spacer size="extraLarge" />
        {maps.map((map, index) => {
          return (
            <MapPlanContainer>
              <Text
                variant="label"
                style={{ color: "white", top: -30, fontSize: 32 }}
              >
                {map.name}
              </Text>
              <Text
                variant="label"
                style={{ color: "white", top: -26, fontSize: 26 }}
              >
                3/9
              </Text>
              <ModuleContainer>
                <FlatList
                  style={{
                    height: 150,
                    marginTop: "auto",
                    flexGrow: 0,
                  }}
                  contentContainerStyle={{
                    justifyContent: "center",
                  }}
                  data={map.modules}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    const progress = item.progress;
                    return (
                      <Row>
                        <View
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignContent: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor:
                              progress === 1
                                ? "#64edff"
                                : progress === 2
                                ? "#5cffae"
                                : progress === 3
                                ? "#91ff76"
                                : "#fffb28",
                          }}
                        >
                          <Text
                            variant="label"
                            style={{
                              // color: "white",
                              fontSize: 26,
                            }}
                          >
                            {item.progress + " "}
                          </Text>
                        </View>
                        <Text
                          variant="label"
                          style={{ color: "white", fontSize: 26 }}
                        >
                          {item.name}
                        </Text>
                      </Row>
                    );
                  }}
                />
                {/* {map.modules.map((module, index) => {
                  const progress = module.progress;
                  if (progress >= 1) {
                    return (
                      <>
                        <Text
                          variant="label"
                          style={{
                            color: "white",
                            fontSize: 32,
                            
                          }}
                        >
                          {module.progress}
                        </Text>
                        <Text
                          variant="label"
                          style={{ color: "white", fontSize: 32 }}
                        >
                          {module.name}
                        </Text>
                      </>
                    );
                  }
                })} */}
              </ModuleContainer>
            </MapPlanContainer>
          );
        })}
      </ScrollView>
    </>
  );
};
// export default function Plan() {
//   useEffect(() => {
//     onSnapshot(collection(db, "plan"), () => {});
//   });
// }
