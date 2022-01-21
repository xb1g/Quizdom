import React, { useEffect, useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Dimensions,
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
import Carousel from "react-native-snap-carousel";
import { ProgressBar } from "react-native-paper";
import moment from "moment";

const MapPlanContainer = styled(View)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 30px;
  padding: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[3]};
  margin-bottom: -70px;
  margin-right: ${(props) => props.theme.space[3]};
  margin-left: ${(props) => props.theme.space[3]};
`;

const ModuleContainer = styled(View)`
  height: 50px;
`;

export const PlannerScreen = ({ navigation }) => {
  const theme = useTheme();
  const { width, height } = Dimensions.get("window");
  const { allModules, updated } = useContext(MapsContext);
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
  }, [allModules, updated]);

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.bg.primary }}>
        <Spacer size="extraLarge" />
        <Spacer size="extraLarge" />
        <Spacer size="extraLarge" />
        <Spacer size="extraLarge" />
        {maps.map((map, index) => {
          const modules = map.modules.filter((module) => module.reviewAt);
          console.log(modules);
          return (
            <>
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
                <ModuleContainer></ModuleContainer>
              </MapPlanContainer>
              <Carousel
                sliderWidth={width}
                itemWidth={width - 80}
                sliderHeight={200}
                data={modules}
                renderItem={({ item }) => {
                  const progress = item.progress;
                  console.log(item.reviewAt);
                  return (
                    <>
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
                          marginBottom: -30,
                          marginLeft: -10,
                          zIndex: 1,
                        }}
                      >
                        <Text
                          variant="label"
                          style={{
                            fontSize: 26,
                          }}
                        >
                          {progress + " "}
                        </Text>
                      </View>
                      <View
                        style={{
                          padding: 20,
                          backgroundColor: "#525252",
                          borderRadius: 30,
                          marginBottom: 10,
                        }}
                      >
                        <ProgressBar
                          progress={progress / 4}
                          style={{
                            marginTop: -36,
                            marginLeft: 22,
                            height: 8,
                            width: "90%",
                            borderRadius: 20,
                          }}
                          color={
                            progress === 1
                              ? "#64edff"
                              : progress === 2
                              ? "#5cffae"
                              : progress === 3
                              ? "#91ff76"
                              : "#fffb28"
                          }
                        />
                        <View style={{ marginLeft: 20 }}>
                          <Text
                            variant="label"
                            style={{ color: "white", fontSize: 26 }}
                          >
                            {item.name + " "}
                          </Text>
                          <Text style={{ color: "white", fontSize: 16 }}>
                            {moment(item.reviewAt.toDate()).fromNow()}
                          </Text>
                        </View>
                      </View>
                    </>
                  );
                }}
              />
            </>
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
