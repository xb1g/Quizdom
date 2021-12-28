import React, { useContext } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { shadow } from "../../../components/shadow/shadow.styles";
import { Text } from "../../../components/typography/text.component";
import { Row } from "../../../components/utility/row.component";
import { MapsContext } from "../../../services/maps/maps.context";

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
  border-radius: 30px;
  margin-horizontal: 20px;
  margin-bottom: 20px;
  width: 150px;
  height: 170px;
  margin-horizontal: 10px;
`;

export const Maps = ({ maps, navigation }) => {
  const { setMapName } = useContext(MapsContext);
  return (
    <>
      <FlatList
        horizontal
        style={{ marginHorizontal: 0 }}
        data={maps}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          // item.key = String(item.id) + item.name;
          return (
            <Row>
              <TouchableOpacity
                style={{
                  flex: 1,
                }}
                onPress={() => {
                  setMapName(item.name);
                  navigation.navigate(item.navigateName);
                }}
              >
                <Text
                  variant="label"
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 20,
                    color: "#fff",
                    zIndex: 1,
                    fontSize: 42,
                    ...shadow.shadow2,
                  }}
                >
                  {item.progress + "/" + item.modulesCount + " "}
                </Text>
                <MapCardContainer>
                  <View
                    style={{
                      width: 150,
                      height: 150,
                    }}
                  >
                    <Image
                      source={item.image}
                      style={{
                        width: 150,
                        height: 150,
                        borderRadius: 30,
                      }}
                    />
                    <Text
                      variant="label"
                      style={{
                        fontSize: 25,
                        color: "#ffffff",
                        alignSelf: "center",
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>

                  {/* </LinearGradient> */}
                  {/* </View> */}
                </MapCardContainer>
              </TouchableOpacity>
            </Row>
          );
        }}
        keyExtractor={(item) => item.id + item.name}
      />
      {/* </MapContainer> */}
    </>
  );
};
