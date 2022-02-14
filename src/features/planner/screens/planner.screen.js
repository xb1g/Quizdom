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
import { MotiView, MotiText } from "moti";
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
import { SET_MAP_NAVIGATION_NAME } from "../../../infrastructure/constants/navigation";

const MapPlanContainer = styled(MotiView).attrs({
  from: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    type: "spring",
  },
})`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 30px;
  padding: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[4]};
  margin-bottom: -70px;
  margin-right: ${(props) => props.theme.space[3]};
  margin-left: ${(props) => props.theme.space[3]};
`;

const ModuleContainer = styled(View)`
  height: 40px;
`;

const goToModule = (module, navigation) => {
  // console.log("GOTO", module);
  // navigation.navigate("SetMapScreen");
};

export const PlannerScreen = ({ navigation }) => {
  const theme = useTheme();
  const { width, height } = Dimensions.get("window");
  const { allModules, updated, setSelectedMapName, setSelectedModule } =
    useContext(MapsContext);
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    const allNames = Object.keys(allModules);
    const saveModules = [];
    allNames.forEach((name) => {
      const module = allModules[name];
      saveModules.push(module);
    });
    setMaps(saveModules);
  }, [allModules, updated]);

  return (
    <>
      <View style={{ flex: 1 }}>
        {/* <Spacer style={{ width: 101, height: 100 }} /> */}
        {maps && (
          <>
            <FlatList
              style={{
                flex: 1,
                paddingTop: 90,
                backgroundColor: theme.colors.bg.primary,
              }}
              data={maps}
              renderItem={(map) => {
                // console.log("maaap");
                // console.log(map);
                map = map.item;
                const modules = map.modules.filter((module) => module.reviewAt);
                const progress = modules.length;
                // const modules = map.item.modules;
                // console.log("maaap");
                // console.log(map);
                return (
                  <>
                    <MapPlanContainer>
                      <Text
                        variant="label"
                        style={{ color: "white", top: -30, fontSize: 36 }}
                      >
                        {map.name}
                      </Text>
                      <Text
                        variant="label"
                        style={{ color: "white", top: -26, fontSize: 26 }}
                      >
                        {progress + "/" + map.modules.length}
                      </Text>
                      <ModuleContainer />
                    </MapPlanContainer>
                    {progress > 0 ? (
                      <Carousel
                        sliderWidth={width}
                        itemWidth={width - 80}
                        sliderHeight={200}
                        data={modules}
                        renderItem={({ item }) => {
                          const progress = item.progress;
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
                                <TouchableOpacity
                                  onPress={() => {
                                    // console.log("MAPPER", map);
                                    // console.log("itemfg");
                                    // console.log(item);
                                    setSelectedMapName(map.name);
                                    const module = {
                                      name: item.name,
                                      id: item.id,
                                      unlocked: true,
                                    };
                                    setSelectedModule(module);
                                    // setSelectedModule(module);
                                    navigation.navigate("Home", {
                                      screen: SET_MAP_NAVIGATION_NAME,
                                    });
                                  }}
                                >
                                  <View style={{ marginLeft: 20 }}>
                                    <Text
                                      variant="label"
                                      style={{ color: "white", fontSize: 26 }}
                                    >
                                      {item.name + " "}
                                    </Text>
                                    <Text
                                      style={{ color: "white", fontSize: 16 }}
                                    >
                                      {moment(
                                        item.reviewAt.toDate()
                                      ).calendar()}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </>
                          );
                        }}
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedMapName(map.name);
                          navigation.navigate("Home", {
                            screen: SET_MAP_NAVIGATION_NAME,
                          });
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 16,
                            marginLeft: 40,
                          }}
                        >
                          Start learning
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                );
              }}
              keyExtractor={(item) => item.name}
            />
          </>
        )}
        {/* </ScrollView> */}
      </View>
    </>
  );
};
