import React,{useState} from 'react';
import {View, StyleSheet, TextInput,Text} from 'react-native';


// react native elements
import { Dialog } from "@rneui/base";


const AddNoteDialog = ({item,visable,setVisable}) => {

    const [title, setTitle] = useState("")
    const [note, setNote] = useState("")

    return (
        <Dialog
              overlayStyle={{backgroundColor:"white", flex:1}}
              isVisible={visable}
              onBackdropPress={() => setVisable(false)}
            >
              <Dialog.Title title="hey" />
              <Text className="text-black">
                Add New
              </Text>

              {/* Writing Area */}
              <TextInput value= {title} onChangeText={(text)=>setTitle(text)} placeholder='Title' className="p-2 text-2xl text-center text-red-400"/>
              <TextInput value= {note} onChangeText={(text)=>setNote(text)}  placeholder='Write here' className="p-2 text-xl text-left text-gray-800" />





              <Dialog.Actions>
                <Dialog.Button
                  title="Add"
                  onPress={() => {
                    setVisable(false);
                  }}
                />
                <Dialog.Button
                  title="CANCEL"
                  onPress={() => setVisable(false)}
                />
              </Dialog.Actions>
            </Dialog>
        
    );
}

const styles = StyleSheet.create({})

export default AddNoteDialog;
