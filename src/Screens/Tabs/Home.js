import React, {useEffect} from 'react';
import {View, Text,StatusBar} from 'react-native';
import {authentication} from '../../firebase/firebase';
const Home = ({navigation,route})=>{
    useEffect(()=>{
        // check if user is signed in
        authentication.onAuthStateChanged((user)=>{
            if(!user){
                route.params.authenticate(false);
            }
        });
    },[]);
    return(
        <View>
            <StatusBar  backgroundColor="#fff" barStyle="dark-content"/>
            <Text>Home</Text>
        </View>
    )
}

export default Home