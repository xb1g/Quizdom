import React, { useContext } from "react";
import { List, Avatar } from "react-native-paper";
import styled from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";

import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

const UserIcon = styled(Avatar.Icon)`
  align-self: center;
`;

const AvaterContainer = styled.View`
  align-items: center;
`;

export const UserScreen = ({ navigation }) => {
  const onEditUserInfo = () => {
    navigation.navigate("EditUserInfoScreen");
  };
  const { onLogout, user } = useContext(AuthenticationContext);
  return (
    <SafeArea>
      <AvaterContainer>
        <UserIcon size={100} icon="human" backgroundColor="#2182bd" />
        <Spacer />
        <Text>{user.email}</Text>
      </AvaterContainer>
      <List.Section>
        <SettingsItem
          title="edit user info"
          onPress={onEditUserInfo}
          left={(props) => <List.Icon {...props} color="black" icon="pencil" />}
        />
      </List.Section>
      <List.Section>
        <SettingsItem
          title="Logout"
          onPress={onLogout}
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
        />
      </List.Section>
    </SafeArea>
  );
};
