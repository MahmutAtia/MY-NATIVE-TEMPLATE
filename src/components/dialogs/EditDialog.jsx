import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

// react native elements
import { Button, Dialog, Divider } from "@rneui/base";

//sql
import db from "../../db";
import { Checklist } from "./checkboxlist";

const EditNoteDialog = ({visable,setVisable,item,notes, setNotes}) => {


  //states
  const [checked, setChecked] = useState([0, 0]); 
  const [title, setTitle] = useState();
  const [note, setNote] = useState();




  // update note
  const updateNote = (title, text, urg,imp) => {
    console.log(title, text, urg,imp);

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE notes SET title = ? ,text = ? ,urg = ? ,imp = ?  WHERE id = ?",
        [title, text, urg,imp,item.id],
        (txObj, resultset) => {
          console.log("UPDATING NOTE"+item.id.toString());
           let existingNotes = [...notes];
          let index = existingNotes.findIndex((note) => note.id === item.id);
          item.title = title;
          item.text = text;
          item.urg = urg;
          item.imp = imp;
          existingNotes[index] = item;
          setNotes(existingNotes);
        },
        (txObj, err) => console.log(err)
      );
    });
  };



// the solution to editng the state of the dialog when clicked on a note
useMemo(() => {
  setTitle(item.title)
  setNote (item.text)
  setChecked([item.urg,item.imp])
 
}, [item])

 

  return (
    <Dialog
      overlayStyle={{ backgroundColor: "white", height: "100%", width: "100%" }}
      isVisible={visable}
      onBackdropPress={() => setVisable(false)}
    >
      <Dialog.Title title={"Edit"} />

      <Text className="text-yellow-500  ml-[25vh]">Enjoy yourself</Text>

      {/* Important Urgent */}
      <Checklist checked={checked} setChecked={setChecked} />

      {/* Writing Area */}
      <View className="flex-1">
      <TextInput
        multiline
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Title"
        className=" p-3 text-2xl text-left text-blue-400"
      />
      <Divider inset insetType="right"  />
      <TextInput
        multiline
        value={note}
        onChangeText={(text) => setNote(text)}
        placeholder="Write here"
        className="p-3 text-lg text-left text-gray-600 m-1"
      />
      </View>

      <Dialog.Actions>
        <Dialog.Button
          title="EDIT"
          onPress={() => {
            setVisable(false);

            let date = new Date().toJSON().slice(0, 10);
            console.log(date);

            updateNote(title, note, checked[0], checked[1]);
          }}
        />
        <Dialog.Button title="CANCEL" onPress={() => setVisable(false)} />
        <Dialog.Button  title="Delete" onPress={() => {console.log("delete");setVisable(false)}}/>

      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({});

export default EditNoteDialog;
