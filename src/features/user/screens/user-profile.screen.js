import React, { useContext } from "react";
import { View, Image, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

import { Text } from "../../../components/typography/text.component";
// import { Row } from "../../../components/utility/row.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import styled from "styled-components/native";
import { BackButton } from "../components/user-profile.styles";

const H1 = styled(Text)`
  color: #fff;
  font-size: 25px;
`;

const Row = styled.View`
  margin-top: 70px;
  flex-direction: row;
`;
export const UserProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = React.useState(null);
  const { userInfo } = useContext(AuthenticationContext);
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    // console.log(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }
    setProfileImage({ localUri: pickerResult.uri });
  };
  return (
    // <SafeAreaView>
    <View>
      <BackButton navigation={navigation} />
      <Row>
        <TouchableOpacity onPress={openImagePickerAsync}>
          <Image
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              borderColor: "white",
              borderWidth: 2,
              marginLeft: 20,
            }}
            source={{
              uri: profileImage ? profileImage.localUri : userInfo.photoURL,
            }}
          />
        </TouchableOpacity>
        <H1>{userInfo.username}</H1>
      </Row>
      <Button
        title="edit"
        onPress={() => navigation.navigate("EditUserInfoScreen")}
      />
      {/* <Image source={require("../../../assets/images/user.png")} /> */}
      <Text>USERPROFILE</Text>
    </View>
    // </SafeAreaView>
  );
};
