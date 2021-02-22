import React, {useState} from 'react';
import Button from '../../Components/Button';
import PopUp from '../../Components/PopUp';
import Loader from '../../Components/Loader';
import {View, Text,Image, StyleSheet, StatusBar,ScrollView, TouchableOpacity,TextInput} from 'react-native';
import { Icon,Overlay } from 'react-native-elements';
import {authentication} from '../../firebase/firebase';
const SignIn = ({navigation,route})=>{
    const [overlay,setOverlay] = useState(false);
    const [OverlayText,setOverlayText] = useState("");
    const [popUpErr,setpopUpErr] = useState(false);
    const [email,onChangeEmail] = useState('');
    const [password,onChangePassword] = useState('');
    const [loader,setLoader] = useState(false);
    
    const back = ()=>{
        navigation.navigate("getStarted");
    }

    const validate = () =>{
        if(email == '' && password == ''){
            showErr(true,true,"Unable to sign in \n please fill in all fields");
        }else if(email == ''){
            showErr(true,true,"Unable to sign in \n please enter your email");
        }else if(password == ''){
            showErr(true,true,"Unable to sign in \n please enter your password");
        }else{
            setOverlay(false);
            setLoader(true);
            signIn();
        }
    }

    const signIn = ()=>{
        authentication.signInWithEmailAndPassword(email,password)
        .then((response)=>{
            if(authentication.currentUser.emailVerified){
                route.params.authenticate(true);
            }else{
                showErr(true,true,"Please verify your account before signing in");
            }
            setLoader(false);
        }).catch(err=>{
            setLoader(false);
            showErr(true,true,"Unable to continue, please check your email or password.");
        });
    }


    const showErr = (show_overlay,show_popup,overlay_text)=>{
        setOverlay(show_overlay);
        setpopUpErr(show_popup);
        setOverlayText(overlay_text);
    }

    return(
        <>
            <StatusBar  backgroundColor="#DA0E2F" barStyle="light-content"/>
            <ScrollView contentContainerStyle={style.container}>
                    <View style={{alignItems:'center',height:'100%',width:'100%',marginTop:40}}>
                        <View style={{width:'80%',marginBottom:20}}>
                            <TextInput value={email} onChangeText={text => onChangeEmail(text)} style={{height:52,width:'100%',color:'white',borderRadius:10,borderWidth:1,borderColor:'white',paddingLeft:10}} placeholderTextColor="#fff" placeholder="Email" />  
                            <TextInput value={password} onChangeText={text => onChangePassword(text)} secureTextEntry={true} style={{height:52,width:'100%',color:'white',borderRadius:10,marginTop:10,borderWidth:1,borderColor:'white',paddingLeft:10}} placeholderTextColor="#fff" placeholder="Password" />  
                        </View>
                        <Button buttonFunction={()=>validate()} bgcolor="#fff" text="Sign in" color={"#000"} outline={false}/>
                        <TouchableOpacity onPress={()=>navigation.navigate('passwordReset')}>
                            <Text style={{color:'white',marginTop:20,color:'#242424',textDecorationLine:'underline'}}>Forgot password</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
            <Overlay isVisible={overlay}>
                <PopUp successBtn={()=>setOverlay("false")} errorBtn={()=>setOverlay(false)} text={OverlayText} error={popUpErr} />
            </Overlay>
            <Overlay isVisible={loader}>
                <Loader text={'Signing you in, please wait..'}/>
            </Overlay>
        </>
    )
}

export default SignIn
const style = StyleSheet.create({
    container:{
        flexDirection:'column',
        flex:1,
        backgroundColor:'#DA0E2F'
    },
})