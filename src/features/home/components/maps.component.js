import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

import { shadow } from "../../../components/shadow/shadow.styles";
import { Text } from "../../../components/typography/text.component";
import { Row } from "../../../components/utility/row.component";

const MapContainer = styled.View`
  background-color: #fff;
  margin-horizontal: 20px;
  margin-bottom: 20px;
  flex: 1;
  border-radius: 20px;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const MapCardContainer = styled.View`
  background-color: #fff;
  border-radius: 30px;
  margin-horizontal: 20px;
  margin-bottom: 20px;
  width: 150px;
  height: 250px;
  margin-horizontal: 10px;
`;

export const Maps = ({ maps, navigation }) => {
  return (
    <>
      <FlatList
        horizontal
        data={maps}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          item.key = item.id + item.name;
          return (
            <Row>
              <Text
                variant="label"
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                }}
              >
                {item.title}
              </Text>
              <Text
                variant="label"
                style={{
                  position: "absolute",
                  top: 30,
                  left: 20,
                  color: "#fff",
                  zIndex: 1,
                  fontSize: 42,
                }}
              >
                {item.progress + " "}
              </Text>
              <MapCardContainer
                style={{
                  ...shadow.shadow1,
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                  }}
                  onPress={() => {
                    navigation.navigate("MapScreen", {
                      map: item,
                    });
                  }}
                >
                  {/* <View
                  style={{
                    flex: 1,
                    borderRadius: 20,
                    // padding: 10,
                  }}
                > */}
                  <LinearGradient
                    colors={["rgba(0,0,0,0.8)", "transparent"]}
                    style={{
                      width: 150,
                      height: 250,
                      position: "absolute",
                      zIndex: 8,
                      borderRadius: 30,
                    }}
                  />
                  <View
                    style={{
                      width: 150,
                      height: 250,
                    }}
                  >
                    <Image
                      source={item.image}
                      style={{
                        width: 150,
                        height: 250,
                        borderRadius: 30,
                      }}
                    />
                  </View>

                  {/* </LinearGradient> */}
                  {/* </View> */}
                </TouchableOpacity>
              </MapCardContainer>
            </Row>
          );
        }}
        keyExtractor={(item) => item.id + item.title}
      />
      {/* </MapContainer> */}
    </>
  );
};