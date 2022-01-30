import React, { useContext } from "react";
import { View, Image } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { AuthButton } from "../../../account/components/account.styles";
import { SET_MAP_NAVIGATION_NAME } from "../../../../infrastructure/constants/navigation";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { db } from "../../../../../firebase-config";
import { MapsContext } from "../../../../services/maps/maps.context";
import { Text } from "../../../../components/typography/text.component";
import { setsModulesTemplate } from "../../../../services/data/math/sets";
import { Spacer } from "../../../../components/spacer/spacer.component";

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
    <View style={{ padding: 30, flex: 1 }}>
      <Text
        variant="label"
        style={{
          fontSize: 50,
          color: "white",
        }}
      >
        SETS
      </Text>
      <Spacer />
      <Text
        style={{
          fontSize: 20,
          color: "white",
        }}
      >
        8 modules
      </Text>
      <Spacer />
      {setsModulesTemplate[1].map((module, index) => (
        <Text
          key={index}
          style={{
            fontSize: 16,
            color: "white",
          }}
        >
          {module.name}
        </Text>
      ))}
      <Image
        source={require("./badgeset.png")}
        style={{
          width: "80%",
          height: "100%",
          resizeMode: "contain",
          position: "absolute",
          bottom: 0,
          right: -30,
        }}
      />

      <AuthButton
        type="secondary"
        size="large"
        onPress={onStart}
        style={{
          position: "absolute",
          bottom: 40,
        }}
      >
        Start
      </AuthButton>
    </View>
  );
};
