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

let observedUser = null;
let name = "";
let obs = null;
firebase.auth().onAuthStateChanged((user) => {
  observedUser = user;
  console.log("newuser:", user?.uid);
  if (user) {
    obs = db
      .collection("users")
      .doc(user?.uid)
      .onSnapshot((snap) => {
        name = snap.data();
        console.log("user is: ", name);
      });
  }
});

export const db = app.firestore();
export const user = observedUser;
export const userFullName = name;
export default app;
