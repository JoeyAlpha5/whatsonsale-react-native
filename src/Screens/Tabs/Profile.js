import React,{useState,useEffect} from 'react';
import {View,StyleSheet,Image,Text} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import ProfileTab from '../../Components/ProfileTab';
import FollowingTab from '../../Components/FollowingTab';
import Wallet from '../../Components/Wallet';
import {authentication} from '../../firebase/firebase';

const Profile = ({navigation})=>{
    const buttons = ['Following','Profile',"Messenger","Wallet"]
    const [index,setIndex] = useState(1);

    const renderTab = ()=>{
        if(index == 0){
            return <FollowingTab viewBrand={(brand)=>viewBrand(brand)}/>
        }else if(index == 1){
            return <ProfileTab/>
        }else{
            return <Wallet/>
        }
    }
    const viewBrand = (brand)=>{
        navigation.navigate('brand', {data:brand});
    }

    return(
        <View style={{flex:1,width:'100%',alignItems:'center'}}>
            <Image style={{width:80, height:80, borderRadius:40,backgroundColor:'rgba(0, 0, 0, 0.06)', marginTop:20}}/>
            <ButtonGroup
                onPress={(i)=>setIndex(i)}
                selectedIndex={index}
                buttons={buttons}
                containerStyle={{height: 40,marginTop:20,width:'95%'}}
                selectedButtonStyle={{backgroundColor:'#DA0E2F'}}
            />


            {renderTab()}
        </View>
    )
}

export default Profile