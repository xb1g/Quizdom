import { View, Text } from "react-native";
import React, { useContext } from "react";
import AwesomeButton from "react-native-really-awesome-button";
import { AuthButton } from "../../../account/components/account.styles";
import { SET_MAP_NAVIGATION_NAME } from "../../../../infrastructure/constants/navigation";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { db } from "../../../../../firebase-config";
import { MapsContext } from "../../../../services/maps/maps.context";

export const SetMapStartScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const { setSelectedMapName } = useContext(MapsContext);
  const onStart = () => {
    const mapRef = doc(db, "users", user.uid, "maps", "sets");
    updateDoc(mapRef, { isStarted: true });
    setSelectedMapName("sets");
    navigation.navigate(SET_MAP_NAVIGATION_NAME);
  };
  return (
    <View>
      <Text>SETS</Text>
      <Text>8 modules</Text>
      <Text>list</Text>
      <AuthButton type="secondary" size="large" onPress={onStart}>
        Start
      </AuthButton>
    </View>
  );
};
