import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import PageHeader from '../../Components/Header';
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
            <PageHeader title="Home" color="#DA0E2F"/>
            <Text>Home</Text>
        </View>
    )
}

export default Home