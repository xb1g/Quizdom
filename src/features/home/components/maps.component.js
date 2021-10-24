import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components";
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
  flex: 1;
  width: 200px;
  margin-horizontal: 10px;
  border-radius: 20px;
`;

export const Maps = ({ maps }) => {
  return (
    <MapContainer style={shadow.shadow1}>
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
            <MapCardContainer>
              <TouchableOpacity
              // onPress={() => {
              //   navigation.navigate("RestaurantDetail", {
              //     restaurant: item,
              //   });
              // }}
              >
                <Card>
                  <Card.Cover
                    style={{
                      borderRadius: 20,
                    }}
                    source={item.image}
                  />
                  <Card.Content>
                    <Text>Card title</Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </MapCardContainer>
          );
        }}
        keyExtractor={(item) => item.id + item.title}
      />
    </MapContainer>
  );
};
