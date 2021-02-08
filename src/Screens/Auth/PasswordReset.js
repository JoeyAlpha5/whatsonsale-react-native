import React from 'react';
import Button from '../../Components/Button';
import { Icon } from 'react-native-elements';
import {View, Text, StatusBar,StyleSheet, Image,TouchableOpacity, TextInput, ScrollView} from 'react-native';
const PasswordReset = ({navigation})=>{
    return(
        <>
            <StatusBar  backgroundColor="white" barStyle="dark-content"/>
            <View style={style.body}>
                <View style={style.topSection}>
                    <Image style={{width:173,height:34,resizeMode:'contain',marginTop:30}} source={require('../../assets/textlogo.png')}/>
                </View>
                <ScrollView style={style.bottomSection} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                    <View style={{justifyContent:'center',alignItems:'center',height:'100%'}}>
                        <View style={{width:'95%',height:50, alignItems:'flex-start'}}>
                            <TouchableOpacity onPress={()=>navigation.navigate('getStarted')}>
                                <Icon size={50} color={'#fff'} name='chevron-left' />
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'80%',marginBottom:20}}>
                            <Text style={{color:'#fff',fontSize:40,marginTop:10,marginBottom:30}}>Update {'\n'}password</Text> 
                            <TextInput style={{height:52,width:'100%',color:'white',borderRadius:10,borderWidth:1,borderColor:'white',paddingLeft:10}} placeholderTextColor="#fff" placeholder="Email" />    
                        </View>
                        <Button buttonFunction={()=>validate()} bgcolor="#DA0E2F" text="Confirm" color={"white"} outline={false}/>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default PasswordReset
const style = StyleSheet.create({
    topSection:{
        alignItems:'center',
        justifyContent:'center',
        height:'30%',

    },
    body:{
        flex:1,
        backgroundColor:'white',
        flexDirection:'column',
        justifyContent:'space-between'
    },
    bottomSection:{
        width:'100%',
        height:'70%',
        backgroundColor:'#000',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    }
})
