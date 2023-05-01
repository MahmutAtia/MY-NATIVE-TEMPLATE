import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

// float button
import { FAB } from "@rneui/themed";
import { Dialog } from "@rneui/themed";

const Setting = () => {
  // toggle dialog
  const [visable, setvisable] = useState(false);
  return (
    <View>
      <Text>Settings</Text>
      <FAB color="blue" title="create" onPress={() => setvisable(true)} />

      <Dialog isVisible={visable} onBackdropPress={() => setvisable(!visable)}>
        <Dialog.Title title="hey" />
        <Text>Dialog body text. Add relevant information here.</Text>
        <Dialog.Actions>
          <Dialog.Button
            title="CONFIRM"
            onPress={() => {
              console.log(`Confirmed`);
              setvisable(!visable)
            }}
          />
          <Dialog.Button title="CANCEL" onPress={()=> setvisable(!visable)
} />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Setting;
