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
import Brand from './src/Screens/Brand';
// post and retailer screen
import ViewPost from './src/Screens/ViewPost';
// profile screen
import ProfileSettings from './src/Components/ProfileSettings';
import UpdatePassword from './src/Components/UpdatePassword';
// basket
import BasketTab from './src/Screens/Tabs/BasketTab';

// 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const App = () => {
  const [signedIn, setSignedIn] = useState(true);
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
            <HomeStack.Screen  name="home" initialParams={{ authenticate: signIn }} component={Home} options={{headerRight:()=>(<Ionicons onPress={()=>navigation.navigate("search")} name={"search"} size={20} color={"#575757"} style={{marginRight:10}}/>)}}/>
            <HomeStack.Screen  name="search" component={Search}/>
            <BasketStack.Screen name="brand" component={Brand}/>
            <HomeStack.Screen name="post" component={ViewPost} options={{headerShown:true}}/>
      </HomeStack.Navigator>
    )
  };

  const BasketStack = createStackNavigator();
  const BasketStackScreen = ({navigation,route})=>{
    return(
      <BasketStack.Navigator>
            <BasketStack.Screen name="basket" component={BasketTab}/>
      </BasketStack.Navigator>
    )
  };

  const ProfileStack = createStackNavigator();
  const ProfileStackScreen = ({navigation,route})=>{
    return(
      <ProfileStack.Navigator>
            <ProfileStack.Screen name="profile" component={Profile} options={{headerRight:()=>(<Feather onPress={()=>navigation.navigate("settings")} name={"settings"} size={20} color={"#575757"} style={{marginRight:10}}/>)}}/>
            <ProfileStack.Screen name="settings" component={ProfileSettings} />
            <ProfileStack.Screen name="updatePassword" component={UpdatePassword} />
            <ProfileStack.Screen name="brand" component={Brand}/>
      </ProfileStack.Navigator>
    )
  };

  const NewsStack = createStackNavigator();
  const NewsStackScreen = ({navigation,route})=>{
    return(
      <NewsStack.Navigator>
            <NewsStack.Screen name="news" component={News} />
      </NewsStack.Navigator>
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
                  iconName = focused ? 'home': 'home-outline';
                } else if (route.name === 'basket') {
                  iconName = focused ? 'ios-cart' : 'ios-cart-outline';
                }
                else if (route.name === 'news') {
                  iconName = focused ? 'newspaper' : 'newspaper-outline';
                }else if (route.name === 'profile') {
                  iconName = focused ? 'person' : 'person-outline';
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={25} color={color} />;
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
            <SignedIn.Screen name={"home"} component={HomeStackScreen}/>
            <SignedIn.Screen name={"basket"} component={BasketStackScreen}/>
            <SignedIn.Screen name={"profile"} component={ProfileStackScreen}/>
            <SignedIn.Screen name={"news"} component={NewsStackScreen}/>
          </SignedIn.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
