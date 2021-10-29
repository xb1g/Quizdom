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
  width: 200px;
  height: 300px;
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
                  fontSize: 54,
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
                >
                  {/* <View
                  style={{
                    flex: 1,
                    borderRadius: 20,
                    // padding: 10,
                  }}
                > */}
                  <Image
                    source={item.image}
                    style={{
                      // width: 200,
                      // resizeMode: "contain",
                      flex: 1,
                      width: "100%",
                      height: "100%",
                      resizeMode: "cover",
                    }}
                  />
                  <LinearGradient
                    colors={["rgba(0,0,0,0.8)", "transparent"]}
                    style={{
                      width: 200,
                      height: 200,
                      position: "absolute",
                      zIndex: 8,
                      borderRadius: 30,
                    }}
                  />
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
