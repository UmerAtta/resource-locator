import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm8abUJ5lWOQeyBnBxRJTvzysfHMuqjdc",
  authDomain: "resource-locator-a2f37.firebaseapp.com",
  databaseURL: "https://resource-locator-a2f37.firebaseio.com",
  projectId: "resource-locator-a2f37",
  storageBucket: "resource-locator-a2f37.appspot.com",
  messagingSenderId: "83471478153",
  appId: "1:83471478153:web:febc43d87365cd61d90558",
  measurementId: "G-WDPNPY97BF",
};

const app = firebase.apps.length
  ? firebase
  : firebase.initializeApp(firebaseConfig);

window.addEventListener = (e) => e;

export const db = app.firestore();
export const user = app.auth().currentUser;
export default app;
