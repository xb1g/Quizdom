import React, { useContext } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "../../../components/typography/text.component";
import { PlansContext } from "../../../services/plans/plans.context";

export const PlannerScreen = ({ navigation }) => {
  // const { plans } = useContext(PlansContext);
  const plans = [
    { id: 1, name: "Plan 1" },
    { id: 2, name: "Plan 2" },
  ];
  return plans.length ? (
    <>
      <FlatList
        data={plans}
        renderItem={({ item }) => {
          // item.key = item.id + item.name;
          return <Text>{item.name}</Text>;
        }}
        keyExtractor={(item) => item.id}
      />
      <Text>PlannerScreen</Text>
    </>
  ) : (
    <Text>No plans</Text>
  );
};
