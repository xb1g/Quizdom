import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { List, Avatar } from "react-native-paper";

import { shadow } from "../../../components/shadow/shadow.styles";
import styled from "styled-components";
import { auth } from "../../../../firebase-config";
import { Spacer } from "../../../components/spacer/spacer.component";

import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { UserItem } from "../components/user-item.component";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

const UserIcon = styled(Avatar.Icon)`
  align-self: flex-start;
  margin: 10px;
`;

const Container = styled.View`
  margin: ${(props) => props.theme.space[3]};
  padding: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
  background-color: #3d3d3d;
  border-radius: 20px;
`;

const ItemContainer = styled.View`
  margin: ${(props) => props.theme.space[3]};
  padding: ${(props) => props.theme.space[2]};
  background-color: #3f3f3f;
  border-radius: 20px;
`;

const Line = styled.View`
  height: 1px;
  background-color: #d8d8d860;
  margin-vertical: ${(props) => props.theme.space[2]};
  margin-horizontal: ${(props) => props.theme.space[3]};
`;

export const UserScreen = ({ navigation }) => {
  useEffect(() => {
    console.log(user);
  }, []);
  const onEditUserInfo = () => {
    navigation.navigate("EditUserInfoScreen");
  };

  const { onLogout, user, userInfo } = useContext(AuthenticationContext);
  console.log(userInfo);
  console.log("objecccct");
  console.log(auth.currentUser);
  return (
    <>
      <ScrollView>
        <Spacer size="large" />
        <Spacer size="large" />
        {/* <Spacer size="large" /> */}
        <TouchableOpacity
          onPress={() => navigation.navigate("UserProfileScreen")}
        >
          <Container style={{ ...shadow.shadow2 }}>
            <UserIcon size={75} icon="human" backgroundColor="#2182bd" />
            <Spacer />
            <Text style={{ color: "white" }}>{userInfo.username}</Text>
          </Container>
        </TouchableOpacity>
        <List.Section>
          <ItemContainer style={{ ...shadow.shadow2 }}>
            <UserItem
              icon="trophy"
              title="Achievement"
              onPress={() => navigation.navigate("AchievementScreen")}
            />
            <Line />
            <UserItem
              icon="person-outline"
              title="Leaderboard"
              onPress={() => navigation.navigate("LeaderboardScreen")}
            />
            <Line />
            <UserItem
              icon="people-outline"
              title="Friends"
              onPress={() => navigation.navigate("FriendsScreen")}
            />
            <Line />
            <UserItem
              icon="person"
              title="Announcement"
              onPress={() => navigation.navigate("AnnouncementScreen")}
            />
          </ItemContainer>
          {/* </View> */}
        </List.Section>
        <List.Section>
          <ItemContainer style={{ ...shadow.shadow1 }}>
            <UserItem
              icon="settings-outline"
              title="Settings"
              onPress={() => navigation.navigate("SettingScreen")}
            />
            <Line />
            <UserItem
              icon="help-outline"
              title="Help"
              onPress={() => navigation.navigate("SettingScreen")}
            />
          </ItemContainer>
        </List.Section>
        <List.Section>
          <ItemContainer style={{ ...shadow.shadow2 }}>
            <UserItem
              icon="log-out-outline"
              title="Logout"
              onPress={onLogout}
            />
          </ItemContainer>
        </List.Section>
      </ScrollView>
      {/* </Container> */}
    </>
  );
};
