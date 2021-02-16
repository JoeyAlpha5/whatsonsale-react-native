import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import {authentication} from '../firebase/firebase';
import Ionicons from 'react-native-vector-icons/Feather';

const Settings = ({navigation})=>{
    return(
        <View style={{flex:1,width:'100%',alignItems:'center'}}>
            
            <TouchableOpacity style={style.option} onPress={()=>navigation.navigate('updatePassword')}>
                <Text style={{marginLeft:15}}>Update password</Text>
                <Ionicons style={{marginRight:5}} size={15} name={"chevron-right"}/>
            </TouchableOpacity>
            <View style={[style.option,{borderTopWidth:1,borderColor:'rgba(0, 0, 0, 0.06)'}]}>
                <Text onPress={()=>authentication.signOut()} style={{marginLeft:15,color:'#DA0E2F'}}>Sign out</Text>
            </View>

            
        </View>
    )
}

export default Settings
const style = StyleSheet.create({
    option:{
        width:'100%',
        height:40,
        justifyContent:'space-between',
        backgroundColor:'rgba(0, 0, 0, 0.02)',
        flexDirection:'row',
        alignItems:'center',
    }
})