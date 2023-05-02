import React, { useEffect, useState, version } from "react";
import { View, StyleSheet, Text } from "react-native";

// space card
import SpaceCard from "../components/my-space-components.jsx/spaceCard";
import { useDispatch } from "react-redux";

//sql
import db from "../db";
// react native elements
import { FAB } from "@rneui/themed";
import { Dialog } from "@rneui/base";

const Spaces = ({ navigation }) => {
  //dispatch
  const dispatch = useDispatch();

  // test data

  const myData = [
    {
      title: "Familly",
      imgUrl:
        "https://media.istockphoto.com/id/938217840/vector/flat-icons-set-of-family-planning-info-graphic-design-elements-vector-illustration.jpg?s=170667a&w=0&k=20&c=OE2qinoh57NQMdsU4HGSR42Zt7S0NfhDmBYpBv7ITik=",
      cats: [
        {
          title: "Wishlist",
          imgUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMyRnBzj7Dtiu6qPXHb1Cdg4jkni5tLshVzg&usqp=CAU",
        },
        {
          title: "Goals",
          imgUrl:
            "https://previews.123rf.com/images/liravega258/liravega2581803/liravega258180300007/96818114-distance-learning-graphic-design-elements-in-colorful-illustration.jpg",
        },
      ],
    },
    {
      title: "Learning",
      imgUrl:
        "https://previews.123rf.com/images/liravega258/liravega2581803/liravega258180300007/96818114-distance-learning-graphic-design-elements-in-colorful-illustration.jpg",
      cats: [
        {
          title: "Todos",
          imgUrl:
            "https://img.freepik.com/premium-vector/checklist-complete-tasks-todo-list-premium-quality-modern-flat-design-graphic-elements_189959-168.jpg",
        },
        {
          title: "Goals",
          imgUrl:
            "https://cdn.dribbble.com/users/1152627/screenshots/11546027/media/ef5aaea8ce0f57846b6c30322a64d2c4.png?compress=1&resize=400x300",
        },
      ],
    },
  ];


  

  //states

  //data
  const [spacesData, setSpacesData] = useState([]);

  // delete dialog
  const [deleteDialogVisable, setdeleteDialogVisable] = useState(false);

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
      console.log("iam getting data from spaces table")
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
      console.log(spacesData);


      tx.executeSql(
        "SELECT * FROM spaces ",
        null, // parameters
        (txObj, resultset) => {
          console.log(resultset.rows._array)
          setSpacesData(resultset.rows._array);
        },
        (txObj, err) => console.log(err)
      );
    });
  }, []);

  // add space
  const addSpace = (name, img) => {
    console.log(name);

    db.transaction((tx) => {
      console.log(tx)
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
  };

  
  // delete item
  const deleteSpace = (id) => {
    console.log(id);
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM spaces WHERE id = ?",
        [id],
        (txObj, resultset) => {
          console.log(resultset);
          // if (resultset.rowsAffected > 0) {
          //   let existNames = [...names].filter((item) => item.id !== id);
          //   setnames(existNames);
          // }
        },
        (txObj, err) => console.log(err, txObj)
      );
    });
  };

  // float button
  const [visible, setVisible] = useState();

  console.log("space data", spacesData);

  
  return (
    <View className="flex-1  p-[1.5vh] bg-blue-100">
    <Text>gsklgö</Text>
      {spacesData?.map((item, index) => {
        return (
          <View key={item.id}>
            <SpaceCard
              onPress={() => {
                // navigate to screen
                navigation.navigate("space", { space_id: item.id });
                // set the space data
              }}
              onLongPress={
                //open dialog
                () => setdeleteDialogVisable(true)
              }
              title={item.name}
              imgUrl={item.img}
            />

            {/* deleting dialog */}
            <Dialog
              overlayStyle={{ backgroundColor: "white" }}
              isVisible={deleteDialogVisable}
              onBackdropPress={() => setdeleteDialogVisable(false)}
            >
              <Dialog.Title title="hey" />
              <Text className="text-black">
                Do you want to delete {item.name} space
              </Text>
              <Dialog.Actions>
                <Dialog.Button
                  title="CONFIRM"
                  onPress={() => {
                    deleteSpace(item.id);
                    setdeleteDialogVisable(false);
                  }}
                />
                <Dialog.Button
                  title="CANCEL"
                  onPress={() => setdeleteDialogVisable(false)}
                />
              </Dialog.Actions>
            </Dialog>
          </View>
        );
      })}

      {/* Float Button */}

      <FAB
        visible={visible}
        onPress={() => {
          addSpace(myData[0].title, myData[0].imgUrl);
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
