import { View } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
export function NoInternetScreen({ navigation }) {
  return (
    <View style={{ backgroundColor: "#3a3a3a" }}>
      <Spacer size="extraLarge"></Spacer>
      <View style={{ backgroundColor: "#3a3a3a" }}>
        <Text style={{ color: "#ffffff", fontSize: 16 }}>
          No internet please try connecting internet and retry
        </Text>
      </View>
    </View>
  );
}
