import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useFonts } from "@use-expo/font";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import * as firebase from "firebase";
import { AppLoading } from "expo";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { Navigation } from "./src/infrastructure/navigation";
import { Text } from "./src/components/typography/text.component";
import { Spacer } from "./src/components/spacer/spacer.component";

const firebaseConfig = {
  apiKey: "AIzaSyD2xfxFrxhaXMwLoXSej652YzjKZx20NMk",
  authDomain: "quizdom-1cb1c.firebaseapp.com",
  projectId: "quizdom-1cb1c",
  storageBucket: "quizdom-1cb1c.appspot.com",
  messagingSenderId: "1025707562082",
  appId: "1:1025707562082:web:1ce8eb9f0af5d059a52d3b",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [isLoaded] = useFonts({
    Airstrike: require("./assets/fonts/airstrike.ttf"),
    Airstrike3d: require("./assets/fonts/airstrike3d.ttf"),
    Bahnschrift: require("./assets/fonts/bahnschrift.ttf"),
  });

  if (!isLoaded) {
    // return <AppLoading />;
    return null;
  } else {
    return (
      <>
        <ThemeProvider theme={theme}>
          <AuthenticationContextProvider>
            {/* <Spacer size="large" />
            <Spacer size="large" position="left">
              <Text variant="body">COOL</Text>
              <Text variant="hint">hint</Text>
              <Text variant="caption">cpssst</Text>
              <Text variant="error">err</Text>
              <Text variant="label">label</Text>
              <Text variant="caption">capcaption</Text>
            </Spacer> */}
            <Navigation />
          </AuthenticationContextProvider>
        </ThemeProvider>
      </>
    );
  }
}
