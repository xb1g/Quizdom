import * as firebase from "firebase";

export const loginRequest = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const logoutRequest = () => firebase.auth().signOut();

export const registerRequest = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const resetPasswordRequest = (email) =>
  firebase.auth().sendPasswordResetEmail(email);

export const signinWithGoogle = async () => {
  try {
    const result = await Expo.Google.logInAsync({
      //androidClientId:YOUR_CLIENT_ID_HERE,
      //iosClientId:YOUR_CLIENT_ID_HERE,
      webClientId:
        "1025707562082-goh6tmocvc3cdgks0kpged5489vpisvu.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });
    if (result.type === "success") {
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};
