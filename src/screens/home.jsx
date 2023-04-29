import React from 'react';
import {View, StyleSheet, Text} from 'react-native';


// Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Home = () => {
    
    return (
        <View className ="flex-1 items-center justify-center">
        <Text> Home Page</Text>
        {/* <Button title='go home' onPress={()=>navigation.navigate("counter")}/> */}
    </View>
    );
}

const styles = StyleSheet.create({})

export default Home;
