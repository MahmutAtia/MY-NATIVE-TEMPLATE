import React, { useEffect, useState, version } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";

// space card
import SpaceCard from "../components/my-space-components.jsx/spaceCard";
import { useDispatch } from "react-redux";

//sql
import db from "../db";

// react native elements
import { FAB } from "@rneui/themed";
import { Dialog } from "@rneui/base";
import SelectDialog from "../components/dialogs/selectDialog";

// data to be select
import { myData } from "../data/data";

const Spaces = ({ navigation }) => {
  //dispatch
  const dispatch = useDispatch();

  // test data

  //states

  //data
  const [spacesData, setSpacesData] = useState([]);

  // delete dialog
  const [deleteDialogVisable, setdeleteDialogVisable] = useState(false);

  //select dialog
  const [selectDialogVisable, setSelectDialogVisable] = useState(false);

  // use Effect

  useEffect(() => {
    // create tables
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS spaces (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), img TEXT)",
        null,
        (txObj, resulset) => {
          return;
        },
        (txObj, err) => console.log(err)
      );
    });

    // create tables
    db.transaction((tx) => {
      console.log("iam getting data from spaces table");
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS cats (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30) ,img TEXT , space_id INTEGER,FOREIGN KEY (space_id) REFERENCES spaces(id))",
        null,
        (txObj, resulset) => {
          return;
        },
        (txObj, err) => console.log(err)
      );
    });

    // create tables
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT , title VARCHAR(30), text VARCHAR(255),\
            cat_id INTEGER , space_id INTGER , completed INTEGER , created_at TEXT,\
            completed_at TEXT, urg INTEGER , imp INTEGER,\
            onProgress INTEGER ,\
            FOREIGN KEY (space_id) REFERENCES spaces(id),\
            FOREIGN KEY (cat_id)  REFERENCES cats(id))",
        null,
        (txObj, resulset) => {
          return;
        },
        (txObj, err) => console.log(err)
      );
    });

    // get all spaces

    db.transaction((tx) => {
      console.log("working");

      tx.executeSql(
        "SELECT * FROM spaces ",
        null, // parameters
        (txObj, resultset) => {
          setSpacesData(resultset.rows._array);
        },
        (txObj, err) => console.log(err)
      );
    });
  }, []);

  // add space
  const addSpace = (name, img) => {


        // if 
    if (!spacesData.some((item) => item.name === name)) {

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO spaces (name,img) VALUES (?,?)",
        [name, img],
        (txObj, resultset) => {
          console.log("adding database", txObj);
          let existingSpaces = [...spacesData];
          existingSpaces.push({ id: resultset.insertId, name: name, img: img });
          setSpacesData(existingSpaces);
        },
        (txObj, err) => console.log(err)
      );
    });
  }else{
    Alert.alert("The Space Is Already Added")
  }
  }

  // delete item
  const deleteSpace = (id) => {
    console.log(id);
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM spaces WHERE id = ?",
        [id],
        (txObj, resultset) => {
          console.log(resultset);
          if (resultset.rowsAffected > 0) {
            let existingSpaces = [...spacesData].filter(
              (item) => item.id !== id
            );
            setSpacesData(existingSpaces);
          }
        },
        (txObj, err) => console.log(err)
      );
    });
  };

  // float button
  const [visible, setVisible] = useState();


  return (
    <View className="flex-1  p-[1.5vh] bg-white">
      {spacesData?.map((item, index) => {
        return (
        
            <SpaceCard
            key={item.id + Math.random()}
              onPress={() => {
                // navigate to screen
                navigation.navigate("space", { space_id: item.id });
                // set the space data
              }}
              onLongPress={
                //open dialog
                () => deleteSpace(item.id)
              }
              title={item.name}
              imgUrl={item.img}
            />
          
        );
      })}

      {/* Select Dialog */}

      <SelectDialog
        data={myData}
        visable={selectDialogVisable}
        setVisable={setSelectDialogVisable}
        addSpace={addSpace}
      />

      {/* Float Button */}

      <FAB
        visible={visible}
        onPress={() => {
          setSelectDialogVisable(true);
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

export default Spaces;
