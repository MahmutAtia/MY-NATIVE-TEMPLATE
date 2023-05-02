import {  Text, View } from 'react-native';


//screens
import Cover from './src/screens/cover';


// layouts 
import DrawerLayout from './src/layouts.jsx/drawerLayout';



//Redux
import { Provider } from 'react-redux';
import {store} from './src/store/store'



// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';



//dotenv
import {USER} from '@env'

export default function App() {


  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
    <NavigationContainer independent={true}>

    <Stack.Navigator >
      <Stack.Screen name='cover' component={Cover}  initialParams={{ name: USER }} />
      <Stack.Screen name='home' component={DrawerLayout} options={{ headerShown: false}}
 />

    </Stack.Navigator>

   
    </NavigationContainer>
    </Provider>
  );
}
