import React,{useState} from "react";
import { TextInput, View } from "react-native";
import db from "../db";
import { Checklist } from "../components/dialogs/checkboxlist";
import { Divider } from "@rneui/base";

const NoteEditScreen = ({route}) => {
    const { item } = route.params;
    console.log("note from df",item.text)

    //states
    const [checked, setChecked] = useState([false, false]);
    const [title, setTitle] = useState(item.title);
    const [note, setNote] = useState(item.text);

//   db.transaction((tx) => {
//     tx.executeSql(
//       "UPDATE items SET (title ,text ,cat_id ,space_id ,created_at ) VALUES (?,?,?,?,?)",
//       [title, text, cat_id, space_id, created_at],
//       (txObj, resultset) => {
//         console.log("adding database");
//         let existingitems = [...items];
//         existingitems.push({
//           id: resultset.insertId,
//           title: title,
//           text: text,
//           created_at: created_at,
//           cat_id: cat_id,
//           space_id: space_id,
//         });
//         setitems(existingitems);
//       },
//       (txObj, err) => console.log(err)
//     );
//   });

  return (
    <View>
      {/* Important Urgent */}
      <Checklist checked={checked} setChecked={setChecked} />

      {/* Writing Area */}
      <TextInput
        multiline
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Title"
        className=" p-3 text-2xl text-left text-blue-400"
      />
      <Divider/>
      <TextInput  placeholder="Write here" 
        value={note }
        multiline
        onChangeText={(text) => setNote(text)}
        className=" p-3 text-lg text-left  text-blue-400"

      />
  
    </View>
  );
};

export default NoteEditScreen;
