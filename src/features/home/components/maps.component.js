import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

import { shadow } from "../../../components/shadow/shadow.styles";
import { Text } from "../../../components/typography/text.component";

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
  border-radius: 20px;
  margin-horizontal: 20px;
  margin-bottom: 20px;
  width: 200px;
  margin-horizontal: 10px;
`;

export const Maps = ({ maps }) => {
  return (
    <>
      {/* // <MapContainer style={shadow.shadow1}> */}
      {/* <ScrollView horizontal="true">
        <Card>
          <Text>Map 1</Text>
        </Card>
      </ScrollView> */}

      <FlatList
        horizontal
        data={maps}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          item.key = item.id + item.name;
          return (
            //pressable is more complex
            <MapCardContainer
              style={{
                ...shadow.shadow1,
              }}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.8)", "transparent"]}
                style={{
                  width: 100,
                  height: 100,
                  position: "absolute",
                  zIndex: 8,
                }}
              />
              <TouchableOpacity
              // onPress={() => {
              //   navigation.navigate("RestaurantDetail", {
              //     restaurant: item,
              //   });
              // }}
              >
                <View
                  style={{
                    borderRadius: 20,
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Image
                    source={item.image}
                    style={{
                      width: 200,

                      height: 200,
                    }}
                  />
                  {/* </LinearGradient> */}
                </View>
              </TouchableOpacity>
            </MapCardContainer>
          );
        }}
        keyExtractor={(item) => item.id + item.title}
      />
      {/* </MapContainer> */}
    </>
  );
};
