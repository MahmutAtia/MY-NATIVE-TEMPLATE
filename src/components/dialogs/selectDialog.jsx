import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { Dialog } from "@rneui/base";

const SelectDialog = ({ visable, setVisable, data, addSpace, setNotes }) => {
  return (
    <Dialog
      overlayStyle={{ backgroundColor: "white", height: "70%", width: "90%" }}
      isVisible={visable}
      onBackdropPress={() => setVisable(false)}
    >
      <Dialog.Title title={"Add New"} />
      <Text className="text-yellow-500  ml-[25vh]">Enjoy yourself</Text>

      {/* Select Area */}

      {data?.map((item) => (
        <TouchableOpacity
        key={item.imgUrl}
          onLongPress={() => {
            setVisable(false);
            addSpace(item.title, item.imgUrl);
          }}
          className="grid grid-cols-2 rounded-full overflow-hidden h-[15vh] w-[15vh] my-2 shadow-2xl bg-slate-400"
        >
          <ImageBackground
            className="flex-1 justify-center items-center object-cover "
            source={{ uri: item.imgUrl }}
          >
            <Text className="text-gray-300 font-extrabold text-lg">
              {" "}
              {item.title}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      ))}

      <Dialog.Actions>
        {/* <Dialog.Button
          title="Add"
          onPress={() => {
            setVisable(false);

            let date = new Date().toJSON().slice(0, 10);
            console.log(date);

            addNote(title, note, item.id, item.space_id, date);
          }}
        />
        <Dialog.Button title="CANCEL" onPress={() => setVisable(false)} /> */}
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({});

export default SelectDialog;
