import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// for native wind
import db from "../db";

import clsx from "clsx";
import { Badge } from "@rneui/base";
import EditNoteDialog from "./dialogs/EditDialog";

const Note = ({ item, markAsCompleted,handleEditItem }) => {
  // mark completed in database

  // completed native wind classes
  const [completed, setcompleted] = useState(
    item.completed == 1 ? true : false
  );

const [pressIn, setpressIn] = useState(false)

  let isCompletedTitle = clsx(
    "text-base font-bold text-left mt-2",
    completed && "line-through opacity-80",
    pressIn && "text-[3vh]"

  );
  let isCompletedText = clsx(
    "text-[1.6vh] font-light text-yellow-900  text-left ",
    completed && "line-through opacity-80",
    pressIn && "text-[2.4vh]"

  );

  let isCompletedContainer = clsx(
    "relative h-[27vh] w-[40%] justify-start p-6 bg-white rounded-3xl m-2 ",
    completed && "line-through opacity-50 bg-green-200",
    pressIn && "h-[40vh] w-[59%]"
  );




  return (
    <TouchableOpacity
      key={item.id}
      onPressIn={()=>setpressIn(true)}
      onPressOut={()=>setpressIn(false)}
      onPress={()=>handleEditItem(item)}
      onLongPress={() => {
        markAsCompleted(item);
        setcompleted(!completed);
      }}
      className={isCompletedContainer}
    >
    
      <Text className={isCompletedTitle} ellipsizeMode="tail">
        {item.title} :
      </Text>
      {/* className={" text-sm font-light text-red-700  text-left " + item.completed === 1  && "line-through"} */}
      <Text className={isCompletedText}>{item.text}</Text>


      <View style ={{ position: "absolute", top: 3, left: 3, padding: 3 , flexDirection:"row"} }>
     {item.urg == 1 && <Badge
        status="error"
        value={"Urgent"}
      />
      }

      {item.imp == 1 && <Badge
        status="success"
        value={"Important"}
      />}
      </View>

 

    </TouchableOpacity>
  );
};

export default Note;
