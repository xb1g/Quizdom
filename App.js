import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

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
  return (
    <AuthenticationContextProvider>
      <View style={styles.container}>
        <Text>cool</Text>
        <StatusBar style="auto" />
      </View>
    </AuthenticationContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
