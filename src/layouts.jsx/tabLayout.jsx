import React from "react";
import { View, StyleSheet, Settings } from "react-native";

// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


// pages
import Feeds from "../screens/feeds";
import Spaces from "../screens/spaces";
import SpacesLayout from "./spacesLayout";

const TabLayout = () => {

    //Tab
    const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator initialRouteName="feeds" >

        <Tab.Screen name="feeds" component={Feeds} options= {{headerShown : false}} />
        <Tab.Screen name="Spaces" component={SpacesLayout}  options= {{headerShown : false}}/>



      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default TabLayout;