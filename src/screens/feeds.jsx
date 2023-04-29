import React from 'react';
import {View, StyleSheet, Text} from 'react-native';


// dot env
import {SECRET_KEY} from "@env"
const Feeds = () => {
    return (
        <View>
            <Text> Feeds</Text>
            <Text>SECRET_KEY is  {SECRET_KEY}</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Feeds;
