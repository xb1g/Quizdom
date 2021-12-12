import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export const SettingButton = ({ navigation }) => {
    const { userInfo, user } = useContext(AuthenticationContext);
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        paddingRight: 25,
        //marginTop: -20,
        marginRight: 10,
      }}
      onPress={() => {
        navigation.navigate("Settings");
      }}
    >
      <Image
                style={{
                  position: "absolute",
                  top: -10,
                  left: 0,
                  zIndex: 10,
                  // marginBottom: -60,
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
                source={
                  userInfo.profileImage
                    ? {
                        uri: userInfo.profileImage,
                      }
                    : require("../../../../assets/no_user_picture.png")
                }
              />
    </TouchableOpacity>
  );
};