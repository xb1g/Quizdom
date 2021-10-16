import React, { useContext } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "../../../components/typography/text.component";
import { PlansContext } from "../../../services/plans/plans.context";

export const PlannerScreen = ({ navigation }) => {
  const { plans } = useContext(PlansContext);
  return (
    <>
      <FlatList
        data={plans}
        renderItem={({ item }) => {
          item.key = item.id + item.name;
          return <Text>{item.name}</Text>;
        }}
      />
      <Text>PlannerScreen</Text>
    </>
  );
};
