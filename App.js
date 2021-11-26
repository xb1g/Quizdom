import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useFonts } from "@use-expo/font";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import { AppLoading } from "expo";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { Navigation } from "./src/infrastructure/navigation";
import { Text } from "./src/components/typography/text.component";
import { Spacer } from "./src/components/spacer/spacer.component";

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
            <Navigation />
          </AuthenticationContextProvider>
        </ThemeProvider>
        {/* <StatusBar style="light" /> */}
      </>
    );
  }
}
