import React, {useState} from 'react';
import Button from '../../Components/Button';
import { Icon, Overlay } from 'react-native-elements';
import PopUp from '../../Components/PopUp';
import Loader from '../../Components/Loader';
import {View, Text, StatusBar,StyleSheet, Image,TouchableOpacity, TextInput, ScrollView} from 'react-native';
import {authentication} from '../../firebase/firebase';
const PasswordReset = ({navigation})=>{
    const [overlay,setOverlay] = useState(false);
    const [OverlayText,setOverlayText] = useState("");
    const [resetSent,setResetSent] = useState(false);
    const [popUpErr,setpopUpErr] = useState(false);
    const [email,onChangeEmail] = useState('');
    const [loader,setLoader] = useState(false);

    const validate = ()=>{
        if(email == '' ){
            showErr(true,true,"Unable to sign in \n please enter your email");
        }else{
            setLoader(true);
            resetPassword();
        }
    }

    const resetPassword = () =>{
        var reset = authentication.sendPasswordResetEmail(email);
        reset.then(()=>{
            setLoader(false);
            setResetSent(true);
        }).catch((err)=>{
            setLoader(false);
            showErr(true,true,err.message);
        })
    }

    const showErr = (show_overlay,show_popup,overlay_text)=>{
        setOverlay(show_overlay);
        setpopUpErr(show_popup);
        setOverlayText(overlay_text);
    }
    return(
        <>
            <StatusBar  backgroundColor="#DA0E2F" barStyle="light-content"/>
            <View style={style.body}>
                <ScrollView contentContainerStyle={{alignItems:'center',height:'100%'}}>
                    <View style={{width:'80%',marginBottom:20,marginTop:40}}>
                        <TextInput value={email} onChangeText={text => onChangeEmail(text)} style={{height:52,width:'100%',color:'white',borderRadius:10,borderWidth:1,borderColor:'white',paddingLeft:10}} placeholderTextColor="#fff" placeholder="Email" />    
                    </View>
                    <Button buttonFunction={()=>validate()} bgcolor="#fff" text="Confirm" color={"#000"} outline={false}/>
                </ScrollView>
            </View>
            <Overlay isVisible={overlay}>
                <PopUp errorBtn={()=>setOverlay(false)} text={OverlayText} error={popUpErr} />
            </Overlay>
            <Overlay isVisible={resetSent}>
                <PopUp successBtn={()=>{setResetSent(false);onChangeEmail("")}} text={"Password reset link has been sent to your email account."} />
            </Overlay>
            <Overlay isVisible={loader} onBackdropPress={()=>setLoader(false)}>
                <Loader text={'Processing, please wait..'}/>
            </Overlay>
        </>
    )
}

export default PasswordReset
const style = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'#DA0E2F',
        flexDirection:'column',
        justifyContent:'space-between'
    },
})
