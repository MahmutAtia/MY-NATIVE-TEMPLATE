import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

// react native elements
import { Dialog, Divider } from "@rneui/base";

//sql
import db from "../../db";
import { Checklist } from "./checkboxlist";

const AddNoteDialog = ({ item, visable, setVisable, notes, setNotes }) => {
  const [checked, setChecked] = useState([false, false]);

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  // add note
  const addNote = (title, text, cat_id, space_id, created_at, urg ,imp) => {
    console.log(title, text, cat_id, space_id, created_at);

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO notes (title ,text ,cat_id ,space_id ,created_at ,urg ,imp ) VALUES (?,?,?,?,?,?,?)",
        [title, text, cat_id, space_id, created_at],
        (txObj, resultset) => {
          console.log("adding database");
          let existingNotes = [...notes];
          existingNotes.push({
            id: resultset.insertId,
            title: title,
            text: text,
            created_at: created_at,
            cat_id: cat_id,
            space_id: space_id,
            urg : urg,
            imp : imp
          });
          setNotes(existingNotes);
        },
        (txObj, err) => console.log(err)
      );
    });
  };

  return (
    <Dialog
      overlayStyle={{ backgroundColor: "white", height: "100%", width: "100%" }}
      isVisible={visable}
      onBackdropPress={() => setVisable(false)}
    >
      <Dialog.Title title={"Add New To " + item?.name} />
      <Text className="text-yellow-500  ml-[25vh]">Enjoy yourself</Text>

      {/* Important Urgent */}
      <Checklist checked={checked} setChecked={setChecked} />

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
          title="Add"
          onPress={() => {
            setVisable(false);

            let date = new Date().toJSON().slice(0, 10);
            console.log(date);

            addNote(title, note, item.id, item.space_id, date, checked[0], checked[1]);
          }}
        />
        <Dialog.Button title="CANCEL" onPress={() => setVisable(false)} />
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({});

export default AddNoteDialog;
