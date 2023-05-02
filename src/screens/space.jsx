import React,{useEffect,useState} from 'react';
import {View, Text} from 'react-native';
import SpaceCard from '../components/my-space-components.jsx/spaceCard';





// react native elements
import { FAB } from "@rneui/themed";
import DeleteDialog from '../components/dialogs/deleteDialog';

//sql
import db from "../db";


const Space = ({navigation,route}) => {

      const {space_id} = route.params;
    //   console.log(data[0].notes)


  const  catsSelect =  [
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
      ]


    // states
    const [cats, setCats] = useState([])  // category data

    const [visable, setVisable] = useState(false)






    

    useEffect(() => {
      

    // get all cats
    db.transaction((tx) => {
        console.log("iam getting data from cats table")
        console.log(space_id)
  
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
    }, [])



     //add space
  const addCat = (name, img) => {    // space_id come from the route params 
    console.log(name)

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO cats (name,img,space_id) VALUES (?,?,?)",
        [name, img,space_id],
        (txObj, resultset) => {
         
          let existingeCats = [...cats];
          existingeCats.push({ id: resultset.insertId, name: name,img:img, space_id:space_id });
          setCats(existingeCats);
        },
        (txObj, err) => console.log(err)
      );
    });
  };

    

 // delete item
 const deleteCat = (id) => {
    console.log(id)
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
            {cats.map((item,index)=>{
            return <View>
             <SpaceCard
            onLongPress={()=>setVisable(true)}
            onPress = {()=>navigation.navigate("notes", {notes : item.notes})}
            key={item.id}
            title={item.name} 
            imgUrl={item.img}
             />

             <DeleteDialog item= {item}
              visable={visable} setVisable={setVisable} deleteItem={deleteCat} />
             </View>
        })}


        <FAB
        visible={true}
        onPress={() => {
          addCat(catsSelect[0].title, catsSelect[0].imgUrl);
        }}
        placement="right"
        title="Add"
        icon={{ name: "create", color: "white" }}
        color="red"
      />
        </View>
    );
}


export default Space;
