import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, useWindowDimensions, View,StatusBar as ReactNativeStatusBar } from "react-native";
import { Icon } from "react-native-elements";
import HomeScreen from "./src/home";
import SettingsScreen from "./src/settings";
import Scientific from "./src/scientific";
import { Platform } from "react-native";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator()

const screenOptions = ({route,navigation})  => {
  return ({
    headerRight: () =>
    route.name == "Calculator" ? (
      <Icon
        name="settings"
        color="white"
        onPress={() => {
          navigation.navigate("Settings");
        }}
      />
    ) : (
      <Icon
        name="home"
        color="white"
        onPress={() => {
          navigation.navigate("Calculator");
        }}
      />
    ),
    headerLeft: () => (
      <Icon name="menu" color="white" onPress={() => {
        navigation.openDrawer()
      }} />
    ),
  headerStyle: { backgroundColor: "#454241"},
  headerTintColor: "#fff",
  headerRightContainerStyle: { paddingRight: 10 },
  headerLeftContainerStyle:{paddingLeft:10}

  })
}

const HomeStackNavigator = () => {
  return (
      <Stack.Navigator
      initialRouteName={"Calculator"}
        screenOptions={screenOptions}
      >
        <Stack.Screen component={HomeScreen} name="Calculator" />
        <Stack.Screen component={SettingsScreen} name="Settings" />
        <Stack.Screen component={Scientific} name="Scientific" />
      </Stack.Navigator >
  )
}

const ScientificStackNavigator = () => {
  return (
      <Stack.Navigator
      initialRouteName={"Scientific"}
        screenOptions={screenOptions}
        headerMode={Platform.OS == "web" ? "screen" : "none"}
      >
        
        <Stack.Screen component={HomeScreen} name="Calculator" />
        <Stack.Screen component={SettingsScreen} name="Settings" />
        <Stack.Screen component={Scientific} name="Scientific" />
      </Stack.Navigator >

  )
}
 
export default function App() {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;
  return (
    <NavigationContainer >
      <StatusBar translucent animated style="light" />
      <Drawer.Navigator drawerType={'front'}
      drawerStyle={{marginTop:ReactNativeStatusBar.currentHeight+5,}}
      overlayColor="transparent"
      drawerContentOptions={{
        activeTintColor:"white",
        activeBackgroundColor:"#454241",
        labelStyle:{textAlign:"center"}
      }}
      statusBarAnimation={"fade"}
      initialRouteName={"Scientific"}
      >
        <Drawer.Screen name="Home" component={HomeStackNavigator} />
        <Drawer.Screen  name="Settings" component={SettingsScreen} /> 
        <Drawer.Screen name="Scientific" component={ScientificStackNavigator} />
      </Drawer.Navigator>
      {/* <MainStackNavigator /> */}
    </NavigationContainer>
  );
}
