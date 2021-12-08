import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BackButton } from "../../../components/button/back-button.component";
import { HeaderText } from "../../../components/utility/header-text.component";
import { MapsContext } from "../../../services/maps/maps.context";

export function ResourceScreen({ navigation }) {
  const { selectedModule } = useContext(MapsContext);
  return (
    <View style={{ flex: 1, backgroundColor: "#432" }}>
      <BackButton navigation={navigation} />
      {/* <HeaderText title="Resource" /> */}
      <Text>Study Resources</Text>
      <Text>https://www.google.co.th/?hl=th</Text>
      <Text>https://www.google.co.th/?hl=th</Text>
      <Text>https://www.google.co.th/?hl=th</Text>
      <Text>https://www.google.co.th/?hl=th</Text>
      <Text>https://www.google.co.th/?hl=th</Text>
      <Text>https://www.google.co.th/?hl=th</Text>
      <Text>https://www.google.co.th/?hl=th</Text>
      <Text>https://www.google.co.th/?hl=th</Text>
      <Text>https://www.google.co.th/?hl=th</Text>
      <Text>https://www.google.co.th/?hl=th</Text>
      <Text>https://www.google.co.th/?hl=th</Text>
      <Text>https://www.google.co.th/?hl=th</Text>
      <Text>https://www.google.co.th/?hl=th</Text>
      <Text>https://www.google.co.th/?hl=th</Text>
      <Text>https://www.google.co.th/?hl=th</Text>
      <Text>{selectedModule}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Quiz")}>
        <Text>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}
