import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "./Home";
import Favorite from "./Favorite";
import Friends from "./Friends";
import Login from "./Login";
import CreateLogin from "./CreateLogin";

const Stack = createStackNavigator();

function Routes() {
  return (   
     
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
          <Stack.Screen name='CreateLogin' component={CreateLogin} options={{headerShown:false}} />
          <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
          <Stack.Screen name='Friends' component={Friends} options={{headerShown:false}} />
          <Stack.Screen name='Favorite' component={Favorite} options={{headerShown:false}} />
        </Stack.Navigator>
       
  );
}

export default Routes;
