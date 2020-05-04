import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

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

const navItems = {
  HOME: "Home",
  LINKS: "Links",
  LOGIN: "Login",
  SIGNUP: "Signup",
  DASHBOARDSCREEN: "Dashboard",
  EVENTSCREEN: "Events",
  RESOURCESCREEN: "Resources",
};

const keyMap = {
  [navItems.HOME]: "How to get started",
  [navItems.LINKS]: "Links to learn more",
  [navItems.LOGIN]: "Login to your account",
  [navItems.SIGNUP]: "Signup to your account",
  [navItems.DASHBOARDSCREEN]: "Welcome!",
  [navItems.EVENTSCREEN]: "Events",
  [navItems.RESOURCESCREEN]: "Resources",
};

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = navItems.HOME;

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name={navItems.HOME}
        component={HomeScreen}
        options={{
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
      />
      <BottomTab.Screen
        name={navItems.LOGIN}
        component={LoginScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      />

      <BottomTab.Screen
        name={navItems.SIGNUP}
        component={SignupScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      />
      <BottomTab.Screen //testing dashboard
        name={navItems.DASHBOARDSCREEN}
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      />
      <BottomTab.Screen //testing dashboard
        name={navItems.EVENTSCREEN}
        component={EventScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      />
      <BottomTab.Screen //testing dashboard
        name={navItems.RESOURCESCREEN}
        component={ResourceScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-person" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  return keyMap[routeName];
}
