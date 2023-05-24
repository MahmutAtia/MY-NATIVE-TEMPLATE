import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

// helper functions
import { markAsOnProgress, markAsCompleted } from "../functions/functions";

import db from "../db";

// openai
import { Configuration, OpenAIApi } from "openai";

// dot env
import { API_KEY } from "@env";

//axios
import axios from "axios";
import { Button } from "@rneui/base";
import OnGoingNote from "../components/OnGoingNote";
import EditNoteDialog from "../components/dialogs/EditDialog";
import { FlatList } from "react-native-gesture-handler";

import { useIsFocused } from "@react-navigation/native";
import { setSpace } from "../features/spaceSlice";

const Feeds = () => {
  //states
  const [thoughts, setThoughts] = useState([]); // all thoughts

  const [summary, setSummary] = useState(); // summary of thoughts

  const [spaces, setSpaces] = useState([]); // all spaces

  const [notes, setNotes] = useState([]); // all notes

  const [editVisable, setEditVisable] = useState(false); //edit dialog

  const [selectedNote, setSelectedNote] = useState({}); //edit dialog

  const isFocused = useIsFocused();

  // Note Components methods

  // mark onProgress

  const handleEditItem = (item) => {
    setSelectedNote(item);

    // edit dialog
    setEditVisable(true);
  };

  useEffect(() => {



    // get all spaces
     db.transaction((tx) => {
        console.log("get all spaces");
  
        tx.executeSql(
          "SELECT * FROM cats ",
          null, // parameters
          (txObj, resultset) => {
            setSpaces(resultset.rows._array);
          },
          (txObj, err) => console.log(err)
        );
      });

    // get all notes
    db.transaction((tx) => {
      console.log("get all notes");

      tx.executeSql(
        "SELECT * FROM notes ",
        null, // parameters
        (txObj, resultset) => {
          setNotes(resultset.rows._array);
        },
        (txObj, err) => console.log(err)
      );
    });
  }, [isFocused]);

  let today = new Date().toJSON().slice(0, 10);


  return (
    <View className=" flex-1 p-2 bg-white">
      {/* on going tasks */}

      {notes.filter((item) => item.onProgress === 1).length > 0 && (
        <>
          <Text className="text-xl font-bold"> OnGoing Tasks</Text>
          <FlatList
            horizontal
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "flex-start",
            }}
            data={notes.filter((item) => item.onProgress === 1)}
            renderItem={({ item, index }) => (
              <OnGoingNote
                key={item.id}
                item={item}
                markAsCompleted={() => markAsCompleted(item, notes, setNotes)}
                markAsOnProgress={() => markAsOnProgress(item, notes, setNotes)}
                handleEditItem={handleEditItem}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </>
      )}

      {/* Todays Tasks */}


      
{ notes.filter(item => item.cat_id === 1 && item.completed === 0 ).length > 0 && <>
     <Text className="text-xl font-bold"> Today's Tasks</Text>
      <FlatList
        horizontal
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
        data={ notes.filter(item => item.cat_id === 1 )}
        renderItem={({ item, index }) => (
          
            <OnGoingNote
              key={item.id}
              item={item}
              markAsCompleted={()=>markAsCompleted(item,notes,setNotes)}
              markAsOnProgress={ ()=>markAsOnProgress(item,notes,setNotes)}
              handleEditItem={handleEditItem}
            />
          
        )}
        keyExtractor={(item) => item.id}
      />
      </>
}
      {/* completed tasks */}

      {notes.filter(
        (item) => item.completed === 1 && item.completed_at === today
      ).length > 0 && (
        <>
          <Text className="text-xl font-bold">Today Completed Tasks</Text>
          <FlatList
            horizontal
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "flex-start",
            }}
            data={notes.filter((item) => item.completed === 1)}
            renderItem={({ item, index }) => (
              <OnGoingNote
                key={item.id}
                item={item}
                markAsCompleted={() => markAsCompleted(item, notes, setNotes)}
                markAsOnProgress={() => markAsOnProgress(item, notes, setNotes)}
                handleEditItem={handleEditItem}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </>
      )}

      <EditNoteDialog
        visable={editVisable}
        setVisable={setEditVisable}
        item={selectedNote}
        notes={notes}
        setNotes={setNotes}
      />

      {/* summmarized thoughts */}
      {/* {summary && <Text>{summary}</Text>}
      <Button
        onPress={() => {
            console.log(text);
          summmarize(text);
        }}
      >
        summarize
      </Button>  */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Feeds;
