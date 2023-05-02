import React from 'react';
import {View, StyleSheet, ImageBackground,Text, TouchableOpacity} from 'react-native';

const SpaceCard = ({onPress,title,imgUrl,onLongPress }) => {
    return (
        <TouchableOpacity onLongPress={onLongPress}  onPress={onPress} className="rounded-2xl overflow-hidden h-[15vh] my-2 shadow-2xl bg-slate-400">

        <ImageBackground className=" h-[15vh] w-full justify-center items-center  " source={{uri:imgUrl}} resizeMode='cover' >
        <Text className="text-4xl font-extrabold text-blue-50 text-center ">{title}</Text>

        </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({})

export default SpaceCard;
