import React, { useContext, useEffect } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { ScrollView } from "react-native-gesture-handler";
import { BackButton } from "../components/user-profile.styles";
import { AchievementContext } from "../../../services/authentication/achievement/achievement.context";
import styledComponentsNative from "styled-components/native";
import { Row } from "../../../components/utility/row.component";
import { shadow } from "../../../components/shadow/shadow.styles";

const Title = styledComponentsNative(Text)`
  font-size: 46px;
  font-weight: bold;
  color: #fff;
`;
const Desc = styledComponentsNative(Text)`
  font-size: 20px;
  margin-left: -10px;
  color: #fff;
  padding: 15px;
  background-color: #000;
  align-self: flex-start;
`;

const Num = styledComponentsNative(Text)`
  font-size: 20px;
  color: #fff;
  padding: 15px;
  align-self: flex-start;
`;

const Container = styledComponentsNative(View)`
  flex: 1;
  padding: 10px;
  align-items: center;
`;

const CloseButton = styledComponentsNative(TouchableOpacity)`
  background-color: rgba(121, 121, 121, 0.5);
  position: absolute;
  align-self: center;
  bottom: 50px;
  padding: 10px;
  border-radius: 10px;
`;

export const BadgeScreen = ({ route, navigation }) => {
  const { item: badge } = route.params;
  const goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    console.log(badge);
  }, [badge]);

  return (
    <>
      <Container>
        <Title variant={"label"}>{badge.title + " "}</Title>
        <Image
          source={
            badge.level === 1
              ? badge.image1
              : badge.level === 2
              ? badge.image2
              : badge.level === 3
              ? badge.image3
              : badge.image0
          }
          style={{ width: 200, height: 200, ...shadow.glow0 }}
        />
        <Desc>{badge.description}</Desc>
        <View>
          <Desc>{badge.progress || 0}</Desc>
          <Row style={{ alignItems: "center", marginTop: 30 }}>
            {badge.rank.map((item, index) => {
              return (
                <>
                  <Image
                    key={index + item.title}
                    source={
                      index === 0
                        ? badge.image1
                        : index === 1
                        ? badge.image2
                        : index === 2
                        ? badge.image3
                        : badge.image0
                    }
                    style={
                      index === 0
                        ? { ...{ width: 50, height: 50 }, ...shadow.glow1 }
                        : index === 1
                        ? { ...{ width: 50, height: 50 }, ...shadow.glow2 }
                        : index === 2
                        ? { ...{ width: 50, height: 50 }, ...shadow.glow3 }
                        : { ...{ width: 50, height: 50 }, ...shadow.glow1 }
                    }
                  />
                  <Num
                    key={index}
                    style={{
                      backgroundColor:
                        badge.level === 1
                          ? item.color1
                          : badge.level === 2
                          ? item.color2
                          : badge.level === 3
                          ? item.color3
                          : item.color0,
                    }}
                  >
                    {item}
                  </Num>
                </>
              );
            })}
          </Row>
        </View>
      </Container>
      <CloseButton onPress={goBack}>
        <Text
          variant="label"
          style={{
            color: "#fff",
            fontSize: 20,
          }}
        >
          {"X "}
        </Text>
      </CloseButton>
    </>
  );
};
