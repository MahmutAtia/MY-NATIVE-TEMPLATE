import React, {useState} from "react";
import { View, StyleSheet , Text} from "react-native";


// react native elements
import { FAB } from "@rneui/themed";
import AddNoteDialog from "../components/dialogs/addNoteDialog";

const NoteScreen = ({route}) => {

    const {notes} = route.params
    console.log(notes)


    //states
    const [visable, setVisable] = useState(false); //fab
     
  return (
    <View className="flex-1 bg-slate-200">
      {notes?.map((item) => (
        <View className=" h-[15vh] w-full justify-center items-center  ">
          <Text className="text-4xl font-extrabold text-black text-center ">
            {item.title}
          </Text>

          <Text className="text-4xl font-extrabold text-black text-center ">
            {item.note}
          </Text>
        </View>
      ))}


<Text>agknsmäg</Text>
      <AddNoteDialog visable={visable} setVisable={setVisable} />


      <FAB
        visible={true}
        onPress={() => {
          setVisable(true)
        }}
        placement="right"
        title="Add"
        icon={{ name: "create", color: "white" }}
        color="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default NoteScreen;
