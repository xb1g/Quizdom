import * as firebase from "firebase";

export const loginRequest = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const logoutRequest = () => firebase.auth().signOut();

export const registerRequest = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const resetPasswordRequest = (email) =>
  firebase.auth().sendPasswordResetEmail(email);

export const loginGoogle = async () => {
  try {
    const result = await Expo.Google.logInAsync({
      //androidClientId:YOUR_CLIENT_ID_HERE,
      // expoClientId: YOUR_CLIENT_ID_HERE,
      behavior: "web",
      iosClientId:
        "1025707562082-sf2a24r371htcesoiggodb9qo9d9de5e.apps.googleusercontent.com",
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
