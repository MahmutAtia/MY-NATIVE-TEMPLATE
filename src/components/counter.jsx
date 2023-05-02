import React from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../features/counterSlice';

const Counter = () => {

    //for redux
    const dispatch = useDispatch()
    const num = useSelector(state=>state.counter.num)
    return (
        <View>
        <Text className = "text-center text-3xl">{num}</Text>
        <Button title='Add' onPress={()=>dispatch(add())} />
            
        </View>
    );
}

const styles = StyleSheet.create({})

export default Counter;
