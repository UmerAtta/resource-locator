import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import firebase from "../Fire";

import TabBarIcon from "../components/TabBarIcon";
import {
  HomeScreen,
  LinksScreen,
  LoginScreen,
  SignupScreen,
  DashboardScreen,
  EventScreen,
  ResourceScreen,
} from "../screens/index";
import { Button } from "@ant-design/react-native";

const navItems = {
  HOME: "Home",
  LINKS: "Links",
  LOGIN: "Login",
  SIGNUP: "Signup",
  DASHBOARDSCREEN: "Dashboard",
  EVENTSCREEN: "Events",
  RESOURCESCREEN: "Resources",
};

let userName = "";

const keyMap = {
  [navItems.HOME]: "How to get started",
  [navItems.LINKS]: "Links to learn more",
  [navItems.LOGIN]: "Login to your account",
  [navItems.SIGNUP]: "Signup to your account",
  [navItems.DASHBOARDSCREEN]: "Welcome!",
  [navItems.EVENTSCREEN]: `Events`,
  [navItems.RESOURCESCREEN]: `Resources`,
};

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = navItems.HOME;

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  const [currentUser, setCurrentUser] = React.useState(
    firebase.auth().currentUser
  );

  React.useEffect(() => {
    userName = currentUser?.email;
  }, [currentUser]);

  // firebase.auth().onAuthStateChanged((user) => {
  //   console.log(user);
  //   currentUser = user;
  // });
  // signOut = () => {
  //   console.log(this.state);
  firebase.auth().onAuthStateChanged((user) => {
    setCurrentUser(user);
  });
  const signOut = () => {
    console.log(this.state);

    // firebase.auth().signOut();
    firebase.auth().signOut().then();
  };

  return (
    <React.Fragment>
      <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        {/* <BottomTab.Screen
        name={navItems.HOME}
        component={HomeScreen}
        options={{s
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          ),
        }}
      />
      <BottomTab.Screen
        name={navItems.LINKS}
        component={LinksScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      /> */}
        {currentUser
          ? [
              // <Button title="signOut" onpress={this?.signOut()} />,

              // <BottomTab.Screen //testing dashboard
              //   name={navItems.DASHBOARDSCREEN}
              //   component={DashboardScreen}
              //   options={{
              //     tabBarIcon: ({ focused }) => (
              //       <TabBarIcon focused={focused} name="md-book" />
              //     ),
              //   }}
              // />,
              <BottomTab.Screen //testing dashboard
                name={navItems.EVENTSCREEN}
                component={EventScreen}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <TabBarIcon focused={focused} name="md-book" />
                  ),
                }}
              />,
              <BottomTab.Screen //testing dashboard
                name={navItems.RESOURCESCREEN}
                component={ResourceScreen}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <TabBarIcon focused={focused} name="md-person" />
                  ),
                }}
              />,
              // <BottomTab.Screen
              //   name={navItems.LOGIN}
              //   component={LoginScreen}
              //   options={{
              //     tabBarIcon: ({ focused }) => (
              //       <TabBarIcon focused={focused} name="md-book" />
              //     ),
              //   }}
              // />,

              // <BottomTab.Screen
              //   name={navItems.SIGNUP}
              //   component={SignupScreen}
              //   options={{
              //     tabBarIcon: ({ focused }) => (
              //       <TabBarIcon focused={focused} name="md-book" />
              //     ),
              //   }}
              // />,
            ]
          : [
              <BottomTab.Screen
                name={navItems.LOGIN}
                component={LoginScreen}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <TabBarIcon focused={focused} name="md-book" />
                  ),
                }}
              />,

              <BottomTab.Screen
                name={navItems.SIGNUP}
                component={SignupScreen}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <TabBarIcon focused={focused} name="md-book" />
                  ),
                }}
              />,
            ]}
      </BottomTab.Navigator>

      {currentUser && (
        <Button title="signOut" color="#f194ff" onPress={signOut}>
          Signout
        </Button>
      )}
      {/* <Button
        title="signOut"
        color="#f194ff"
        onpress={() => firebase.auth().signOut()}
      >
        logout
      </Button> */}
    </React.Fragment>
  );
}
function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  return `${keyMap[routeName]} ${":" + userName}`;
}
