import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import Spaces from "../screens/spaces";
import Space from "../screens/space";
import NoteScreen from "../screens/noteScreen";

const SpacesLayout = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="my-spaces"
          component={Spaces}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="space"
          component={Space}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="notes"
          component={NoteScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SpacesLayout;
