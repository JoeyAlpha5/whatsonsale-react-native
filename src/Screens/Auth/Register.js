import React, {useState} from 'react';
import Button from '../../Components/Button';
import PopUp from '../../Components/PopUp';
import Loader from '../../Components/Loader';
import {View, Text, StatusBar,StyleSheet, Image,TouchableOpacity, TextInput,ScrollView} from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
const Register = ({navigation,route})=>{
    const [overlay,setOverlay] = useState(false);
    const [OverlayText,setOverlayText] = useState("");
    const [popUpErr,setpopUpErr] = useState(false);
    const [loader,setLoader] = useState(false);
    const back = ()=>{
        navigation.navigate("getStarted");
    }

    const createAccount = () =>{
        setLoader(true);
        route.params.authenticate(true);
    }

    return(
        <>
            <StatusBar  backgroundColor="white" barStyle="dark-content"/>
            <View style={styles.body}>
                <View style={styles.topSection}>
                    <Image style={{width:173,height:34,resizeMode:'contain',marginTop:30}} source={require('../../assets/textlogo.png')}/>
                </View>

                <ScrollView style={styles.bottomSection} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>                
                    <View style={{justifyContent:'center',alignItems:'center',height:'100%'}}>
                            <View style={{width:'95%',height:50, alignItems:'flex-start'}}>
                                <TouchableOpacity onPress={back}>
                                    <Icon size={50} color={'#fff'} name='chevron-left' />
                                </TouchableOpacity>
                            </View>
                            <View style={{width:'80%',marginBottom:20}}>
                                <Text style={{color:'#fff',fontSize:40,marginTop:10,marginBottom:30}}>Create {'\n'}Account</Text> 
                                <TextInput  style={{height:52,width:'100%',color:'white',borderRadius:10,borderWidth:1,borderColor:'white',paddingLeft:10}} placeholderTextColor="#fff" placeholder="Full name" />  
                                <TextInput  style={{height:52,width:'100%',color:'white',borderRadius:10,borderWidth:1,borderColor:'white',paddingLeft:10,marginTop:10}} placeholderTextColor="#fff" placeholder="Email" /> 
                                <TextInput  style={{height:52,width:'100%',color:'white',borderRadius:10,borderWidth:1,borderColor:'white',paddingLeft:10,marginTop:10}} placeholderTextColor="#fff" placeholder="Mobile" />
                                <TextInput secureTextEntry={true} style={{height:52,width:'100%',color:'white',borderRadius:10,borderWidth:1,borderColor:'white',paddingLeft:10,marginTop:10}} placeholderTextColor="#fff" placeholder="Password" />
                                <TextInput  secureTextEntry={true} style={{height:52,width:'100%',color:'white',borderRadius:10,marginTop:10,borderWidth:1,borderColor:'white',paddingLeft:10}} placeholderTextColor="#fff" placeholder="Confirm Password" />  
                            </View>
                            <Button buttonFunction={createAccount} bgcolor="#DA0E2F" text="Register" color={"white"} outline={false}/>
                    </View>
                </ScrollView>
            </View>
            <Overlay isVisible={overlay}>
                <PopUp successBtn={()=>setOverlay("false")} errorBtn={()=>setOverlay(false)} text={OverlayText} error={popUpErr} />
            </Overlay>
            <Overlay isVisible={loader}>
                <Loader text={'Creating account, please wait..'}/>
            </Overlay>
        </>
    )
}

export default Register
const styles = StyleSheet.create({
    topSection:{
        alignItems:'center',
        justifyContent:'center',
        height:'20%',

    },
    body:{
        flex:1,
        backgroundColor:'white',
        flexDirection:'column',
        justifyContent:'space-between'
    },
    bottomSection:{
        width:'100%',
        height:'80%',
        backgroundColor:'#000',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        // justifyContent:'center',
        // alignItems:'center'
    }

})