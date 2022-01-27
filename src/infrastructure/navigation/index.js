import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthenticationContext } from "../../services/authentication/authentication.context";
// import { UserInfoContext } from "../../services/user-info/user-info.context";
import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";

export const Navigation = () => {
  const { user } = useContext(AuthenticationContext);
  useEffect(() => {
    // console.log("user", user);
  }, [user]);

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
