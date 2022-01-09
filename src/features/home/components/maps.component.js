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

const MapName = styled(Text)`
  font-size: 25px;
  align-self: center;
  color: #fff;
`;
const ProgressNumber = styled(Text)`
  position: absolute;
  top: 10px;
  left: 20px;
  color: #fff;
  z-index: 1;
  font-size: 42px;
`;
export const Maps = ({ maps, navigation }) => {
  const { setSelectedMapName } = useContext(MapsContext);
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
                  setSelectedMapName(item.name);
                  navigation.navigate(item.navigateName);
                }}
              >
                <ProgressNumber
                  variant="label"
                  style={{
                    ...shadow.shadow2,
                  }}
                >
                  {item.progress + "/" + item.modulesCount + " "}
                </ProgressNumber>
                <MapCardContainer>
                  <View>
                    {!item.isStarted && (
                      <LinearGradient
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "90%",
                          borderRadius: 25,
                          zIndex: 1,
                        }}
                        colors={["#000000", "rgba(0, 0, 0, 0)"]}
                      />
                    )}
                    <Image
                      source={item.image}
                      style={{
                        width: 150,
                        height: 150,
                        borderRadius: 30,
                      }}
                    />
                    <MapName variant="label">{item.name}</MapName>
                  </View>
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
