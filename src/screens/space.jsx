import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import SpaceCard from "../components/my-space-components.jsx/spaceCard";

// react native elements
import { FAB } from "@rneui/themed";
import DeleteDialog from "../components/dialogs/deleteDialog";

//sql
import db from "../db";
import SelectDialog from "../components/dialogs/selectDialog";
import { catsSelectData } from "../data/data";

const Space = ({ navigation, route }) => {
  const { space_id } = route.params;
  //   console.log(data[0].notes)

  // states

  // category data
  const [cats, setCats] = useState([]);

  //
  const [visable, setVisable] = useState(false);

  const [selectDialogVisable, setselectDialogVisable] = useState(false);

  useEffect(() => {
    // get all cats
    db.transaction((tx) => {
      console.log("iam getting data from cats table");
      console.log(space_id);

      tx.executeSql(
        "SELECT * FROM cats where space_id = ? ",
        [space_id], // parameters
        (txObj, resultset) => {
          console.log(resultset.rows._array);
          setCats(resultset.rows._array);
        },
        (txObj, err) => console.log(err)
      );
    });
  }, []);

  //add space

  const addCat = (name, img) => {
    // space_id come from the route params
    console.log(name);
    if (!cats.some((item) => item.name === name)) {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO cats (name,img,space_id) VALUES (?,?,?)",
          [name, img, space_id],
          (txObj, resultset) => {
            let existingeCats = [...cats];
            existingeCats.push({
              id: resultset.insertId,
              name: name,
              img: img, 
              space_id: space_id,
            });
            setCats(existingeCats);
          },
          (txObj, err) => console.log(err)
        );
      });
    } else {
      Alert.alert("The Space Is Already Added");
    }
  };

  // delete item
  const deleteCat = (id) => {
    console.log(id);
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM cats WHERE id = ?",
        [id],
        (txObj, resultset) => {
          console.log(resultset);
          if (resultset.rowsAffected > 0) {
            let existingeCats = [...cats].filter((item) => item.id !== id);
            setCats(existingeCats);
          }
        },
        (txObj, err) => console.log(err, txObj)
      );
    });
  };

  return (
    <View className="flex-1 bg-red-50">
      {cats.map((item, index) => {
        return (
          <View key={item.id}>
            <SpaceCard
              onLongPress={() => setVisable(true) }
              onPress={() => navigation.navigate("notes", { item: item })}
              title={item.name}
              imgUrl={item.img}
            />

            <DeleteDialog
              item={item}
              visable={visable}
              setVisable={setVisable}
              deleteItem={deleteCat}
            />
          </View>
        );
      })}

      <SelectDialog
        data={catsSelectData}
        visable={selectDialogVisable}
        setVisable={setselectDialogVisable}
        addSpace={addCat}
      />

      <FAB
        visible={true}
        onPress={() => {
          setselectDialogVisable(true);
        }}
        placement="right"
        title="Add"
        icon={{ name: "create", color: "white" }}
        color="red"
      />
    </View>
  );
};

export default Space;
