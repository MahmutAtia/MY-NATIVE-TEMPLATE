import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";

//sql
import * as SQLlite from "expo-sqlite"; // use * as sqllite to work

const Cover = ({ navigation, route }) => {
  const name = route.params?.name;

  // names
  const [names, setnames] = useState([]);

  // input name
  const [currentName, setcurrentName] = useState("");

  // sqllit db

  const db = SQLlite.openDatabase("examp.db");

  // use effect
  useEffect(() => {
    // create table
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY AUTOINCREMENT , name TEXT)",
        null,
        (txObj, resultset) => setnames(resultset.rows._array),
        (txObj, err) => console.log(err)
      );
    });

    // get all records

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM names",
        null, // parameters
        (txObj, resultset) => setnames(resultset.rows._array),
        (txObj, err) => console.log(err)
      );
    });
  }, []);

  //add name

  const addName = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO names (name) VALUES (?)",
        [currentName],
        (txObj, resultset) => {
            console.log(resultset)
          let existNames = [...names];
          existNames.push({ id: resultset.insertId, name: currentName });
          setnames(existNames);
          setcurrentName("");
        },
        (txObj, err) => console.log(err)
      );
    });
  };


  // delete name

  const deleteName = (id)=>{
    console.log(id)

    db.transaction(tx=>{
        tx.executeSql("DELETE FROM names WHERE id = ?", [id],
        (txObj,resultset)=>{
            console.log(resultset)
            if (resultset.rowsAffected > 0){
                let existNames = [...names].filter(item=>item.id!==id);
                setnames(existNames);
            }
        }, 
        (txObj,err)=>console.log(err,txObj))
    })
  }


 // update 

 const updateName = (id)=>{
    console.log(id)
    db.transaction(tx=>{
        tx.executeSql("UPDATE names SET name = ?    WHERE id = ?", [currentName , id],
        (txObj,resultset)=>{
            console.log(resultset)

            // if succeded
            if (resultset.rowsAffected >0){
                let existNames = [...names];
                const indexToupdate = existNames.findIndex(item => item.id === id)
                console.log(indexToupdate)
                existNames[indexToupdate].name = currentName;
                console.log( existNames[indexToupdate])
                setnames(existNames)

            }
        },
        (txObj,err)=>console.log(err)
        )
    })
 }

  return (
    <View className="flex-1 items-stretch justify-evenly">
      <View>
        <Text className="text-center text-2xl m-9"> sqllite test</Text>

        {/* all records */}
        {names?.map((item) => (
        <View  className="flex flex-row justify-between m-3">
          <Text className="text-center text-2xl " key={item.id}>{item.name}</Text>
          <Button onPress={()=>deleteName(item.id)} title="Delete"/>
          <Button onPress={()=>updateName(item.id)} title="Update"/>

          </View>

        ))}
        <TextInput className="text-center text-xl text-red-400 font-bold m-5 "
          onChangeText={(text) => setcurrentName(text)}
          value={currentName}
        />

        <Button title="Add name to db" onPress={() => addName()} />
      </View>

      <View>
        <Text> Cover Page</Text>
        <Text> HI {name}</Text>
        <Button title="go home" onPress={() => navigation.navigate("home")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Cover;
