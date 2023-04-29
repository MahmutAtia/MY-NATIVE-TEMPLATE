import React from 'react';
import {View,Text, StyleSheet, Button} from 'react-native';

const Cover = ({navigation, route}) => {
    const name = route.params?.name;
    return (
        <View className ="flex-1 items-center justify-center">
            <Text> Cover Page</Text>
            <Text> HI {name}</Text>
            <Button title='go home' onPress={()=>navigation.navigate("home")} />
        </View>
    );
}

const styles = StyleSheet.create({})

export default Cover;
