import React from "react";
import { View, StyleSheet } from "react-native";

// Navigation
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/home";
import About from "../screens/about";
import TabLayout from "./tabLayout";

const DrawerLayout = () => {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home" >
        <Drawer.Screen name="Home" component={TabLayout}/>
        <Drawer.Screen name="about" component={About}/>

      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default DrawerLayout;
