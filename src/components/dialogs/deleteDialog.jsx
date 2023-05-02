import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

// react native elements
import { FAB } from "@rneui/themed";
import { Dialog } from "@rneui/base";

const  DeleteDialog = ({item,visable,setVisable,deleteItem}) => {
    return (
             <Dialog
              overlayStyle={{backgroundColor:"white"}}
              isVisible={visable}
              onBackdropPress={() => setVisable(false)}
            >
              <Dialog.Title title="hey" />
              <Text className="text-black">
                Do you want to delete {item.name} space
              </Text>
              <Dialog.Actions>
                <Dialog.Button
                  title="CONFIRM"
                  onPress={() => {
                    deleteItem(item.id);
                    console.log(item.id)
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

export default DeleteDialog;
