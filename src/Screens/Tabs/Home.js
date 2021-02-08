import React from 'react';
import {View, Text} from 'react-native';
import PageHeader from '../../Components/Header';
const Home = ({navigation,route})=>{
    return(
        <View>
            <PageHeader title="Home" color="#DA0E2F"/>
            <Text>Home</Text>
        </View>
    )
}

export default Home