import React from "react";
import { View } from "react-native";
import { Text } from "../../../components/typography/text.component";

const Container = styled.View`
  background-color: aliceblue;
  border-radius: 10px;
`;

export const Achievement = ({ icon, title, onPress }) => {
  return (
    <Container>
      <Text style={{ color: "white", paddingLeft: 30, fontSize: 15 }}>
        {title}
      </Text>
      <Image source={icon} />
    </Container>
  );
};
