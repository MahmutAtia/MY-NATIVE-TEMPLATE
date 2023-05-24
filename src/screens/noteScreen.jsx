import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Touchable,
  FlatList,
} from "react-native";

// react native elements
import { FAB } from "@rneui/themed";
import AddNoteDialog from "../components/dialogs/addNoteDialog";

// database
import db from "../db";
import Note from "../components/note";

// EDIT DIALOG
import EditNoteDialog from "../components/dialogs/EditDialog";


//Helper functions
import { markAsCompleted,markAsOnProgress } from "../functions/functions";


import { useIsFocused } from '@react-navigation/native';


const NoteScreen = ({ route, navigation }) => {
  // route item  is the category
  const { item } = route.params;

  const isFocused = useIsFocused();


  // states
  const [notes, setNotes] = useState([]); // all notes
  const [visable, setVisable] = useState(false); //fab
  const [editVisable, setEditVisable] = useState(false); //edit dialog
  const [selectedNote, setSelectedNote] = useState({}); //edit dialog

  // get all notes
  useEffect(() => {
    // get all spaces
    db.transaction((tx) => {
      console.log("get all notes");

      tx.executeSql(
        "SELECT * FROM notes WHERE cat_id = ? and space_id = ?",
        [item.id, item.space_id], // parameters
        (txObj, resultset) => {
          console.log(resultset.rows._array);
          setNotes(resultset.rows._array);
        },
        (txObj, err) => console.log(err)
      );
    });
  }, [isFocused ]);





  console.log("is focused", isFocused);




  const handleEditItem = (item) => {
    setSelectedNote(item);
    

    setEditVisable(true);
    console.log( "the item is hhhh ",item);
  };

  return (
    <View className="flex-1  p-3 bg-gray-100">
      <FlatList
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
        data={notes}
        renderItem={({ item, index }) => (
          <>
            <Note
              key={item.id}
              item={item}
              markAsCompleted={()=>markAsCompleted(item,notes,setNotes)}
              markAsOnProgress={()=>markAsOnProgress (item,notes,setNotes)}
              handleEditItem={handleEditItem}
            />
          </>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />

      <EditNoteDialog
        visable={editVisable}
        setVisable={setEditVisable}
        item={selectedNote}
        notes={notes}
        setNotes={setNotes}
      />

      <AddNoteDialog
        item={item}
        visable={visable}
        setVisable={setVisable}
        notes={notes}
        setNotes={setNotes}
      />

      <FAB
        visible={true}
        onPress={() => {
          setVisable(true);
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
