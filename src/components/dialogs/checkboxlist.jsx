import { CheckBox, ListItem} from "@rneui/base";
import { useState } from "react";
import { View ,Text} from "react-native";



export const Checklist = function ({checked, setChecked}) {
    return (
      <View className="flex flex-row items-center">
      <View className="flex flex-row items-center">
          <CheckBox
            // Use ThemeProvider to change the defaults of the checkbox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checked={checked[0]}
            onPress={() => setChecked([!checked[0], checked[1]])}
          />
           <Text>Urgent</Text>
           </View>

           <View className="flex flex-row items-center">

          <CheckBox
            // Use ThemeProvider to change the defaults of the checkbox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checked={checked[1]}
            onPress={() => setChecked([checked[0], !checked[1]])}
          />
            <Text>Important</Text>

            </View> 
      </View>
    );
  }