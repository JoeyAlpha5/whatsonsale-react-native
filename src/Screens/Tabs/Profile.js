import React from 'react';
import {View, Text} from 'react-native';
import PageHeader from '../../Components/Header';
import {authentication} from '../../firebase/firebase';
const Profile = ()=>{
    return(
        <View>
            <PageHeader title="Profile" color="#DA0E2F"/>
            <Text>Profile</Text>
            <Text onPress={()=>authentication.signOut()}>Sign Out</Text>
        </View>
    )
}

export default Profile