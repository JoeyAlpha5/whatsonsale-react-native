import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Text} from 'react-native';
// auth screens
import Register from './src/Screens/Auth/Register';
import GetStarted from './src/Screens/Auth/GetStarted';
import SignIn from './src/Screens/Auth/SignIn';
import PasswordReset from './src/Screens/Auth/PasswordReset';
// tab screens
import Home from './src/Screens/Tabs/Home';
import Search from './src/Screens/Tabs/Search';
import News from './src/Screens/Tabs/News';
import Profile from './src/Screens/Tabs/Profile';
// post and retailer screen
import ViewPost from './src/Screens/ViewPost';
import ViewRetailer from './src/Screens/ViewRetailer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Feather';

const App = () => {
  const [signedIn, setSignedIn] = useState(false);
  const SignedOut = createStackNavigator();
  const SignedIn = createBottomTabNavigator();
  // update sign in state
  const signIn = (val) =>{
    setSignedIn(val);
  }

  const HomeStack = createStackNavigator();
  const HomeStackScreen = ({navigation,route})=>{
    return(
      <HomeStack.Navigator>
            <HomeStack.Screen  name="home" component={Home} options={{headerShown:false}}/>
            <HomeStack.Screen name="post" component={ViewPost} options={{headerShown:false}}/>
      </HomeStack.Navigator>
    )
  };

  if(!signedIn){
    return(
      <NavigationContainer>
          <SignedOut.Navigator>
            <SignedOut.Screen name={"getStarted"} component={GetStarted} options={{headerShown:false}}/>
            <SignedOut.Screen name={"signIn"} initialParams={{ authenticate: signIn }} component={SignIn} options={{headerShown:false}}/>
            <SignedOut.Screen name={"register"} initialParams={{ authenticate: signIn }} component={Register} options={{headerShown:false}}/>
            <SignedOut.Screen name={"passwordReset"} component={PasswordReset} options={{headerShown:false}}/>
          </SignedOut.Navigator>
      </NavigationContainer>
    );
  }else{
    return(
      <NavigationContainer>
          <SignedIn.Navigator
            screenOptions={({ route }) => ({  
              // tintColor:'red',             
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'home') {
                  iconName = focused ? 'home': 'home';
                } else if (route.name === 'search') {
                  iconName = focused ? 'search' : 'search';
                }
                else if (route.name === 'news') {
                  iconName = focused ? 'message-circle' : 'message-circle';
                }else if (route.name === 'profile') {
                  iconName = focused ? 'user' : 'user';
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={20} color={color} />;
              },
            })}

            
            tabBarOptions= {{
              activeTintColor: "#DA0E2F",
              inactiveTintColor: '#575757',
              keyboardHidesTabBar:true,
              showLabel:true,
              style:{
                backgroundColor:'#FAFAFA',
                borderTopWidth:0,
                height:80,
                borderTopWidth:0.5, 
                borderColor:'rgb(0 0 0 / 50%)',
              },
      
            }}
          >
            <SignedIn.Screen name={"home"} component={HomeStackScreen} navigationOptions={{title: 'Tab2'}}/>
            <SignedIn.Screen name={"search"} component={Search}/>
            <SignedIn.Screen name={"profile"} component={Profile}/>
            <SignedIn.Screen name={"news"} component={News}/>
          </SignedIn.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
