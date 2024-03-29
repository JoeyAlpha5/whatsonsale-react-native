import React, {useState} from 'react';
import Button from '../../Components/Button';
import PopUp from '../../Components/PopUp';
import Loader from '../../Components/Loader';
import {View, Text, StatusBar,StyleSheet, Image,TouchableOpacity, TextInput,ScrollView} from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import {authentication} from '../../firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Register = ({navigation,route})=>{
    const [overlay,setOverlay] = useState(false);
    const [OverlayText,setOverlayText] = useState("");
    const [popUpErr,setpopUpErr] = useState(false);
    const [loader,setLoader] = useState(false);
    const [registered,setRegistered] = useState(false);
    // form input
    const [Fullname,onChangeFullname] = useState('');
    const [name,onChangeName] = useState('');
    const [Email,onChangeEmail] = useState('');
    const [Mobile,onChangeMobile] = useState('');
    const [Password,onChangePassword] = useState('');
    const [ConfirmPassword,onChangeConfirmPassword] = useState('');
    const back = ()=>{
        navigation.navigate("getStarted");
    }

    const createAccount = async () =>{
        setLoader(true);
        // route.params.authenticate(true);
        
        await AsyncStorage.getItem('push_token').then((push_token)=>{
            var register = authentication.createUserWithEmailAndPassword(Email,Password);
            register.then((user)=>{
                // send verification email
                authentication.currentUser.sendEmailVerification();
                // save user data in django backend
                fetch('https://whatsonsale-test.herokuapp.com/api/createAccount', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:"push_token="+push_token+"&name="+name+"&email="+Email+"&mobile="+Mobile+"&user_id="+authentication.currentUser.uid,
                }).then(()=>{
                    setLoader(false);
                    setRegistered(true); 
                }).catch((err)=>{
                    setLoader(false);
                    showErr(true,true,"Registration error.");
                })
                
            }).catch(err=>{
                setLoader(false);
                showErr(true,true,err.message);
            })
            console.log(push_token);
        });
    }

    const validate = ()=>{
        //validate the full name
        var fullname_has_spacing = name.includes(" ");
        var index_of_spacing = name.indexOf(" ");
        var second_name = name.substring(index_of_spacing+1);
        var first_name = name.substring(0,index_of_spacing);
        //
        if(name,Email,Mobile,Password,ConfirmPassword == ''){
            showErr(true,true,"Unable to create account \n please fill in all fields");
        }else if(isNaN(Mobile) || Mobile.length < 10 || Mobile[0] != '0' || Mobile.length > 10){
            showErr(true,true,"Unable to create account \n please enter a valid 10 digit mobile number");
        }else if(Password != ConfirmPassword){
            showErr(true,true,"Unable to create account \n your passwords do not match");
        }else if(fullname_has_spacing == false){
            showErr(true,true,"Unable to create account \n please enter your fullname");
        }else if(first_name.length < 2){
            showErr(true,true,"Unable to create account \n a valid first name must have 2 characters or more");
        }else if(second_name.length < 2){
            showErr(true,true,"Unable to create account \n a valid last name must have 2 characters or more");
        }else if(Password.length < 6){
            showErr(true,true,"Unable to create account \n a password must be at least 6 characters long");
        }
        else{
            createAccount();
        }
    }

    const showErr = (show_overlay,show_popup_err,overlay_text)=>{
        setOverlay(show_overlay);
        setpopUpErr(show_popup_err);
        setOverlayText(overlay_text);
    }

    const SignUpSuccess = ()=>{
        setRegistered(false);
        setLoader(false);
        setOverlay(false);
        onChangeName('');
        onChangeConfirmPassword('');
        onChangeEmail('');
        onChangeMobile('');
        onChangePassword('');
        navigation.navigate('signIn');
    }

    return(
        <>
            <StatusBar  backgroundColor="#DA0E2F" barStyle="light-content"/>
            <View style={styles.body}>              
                <ScrollView contentContainerStyle={{alignItems:'center',height:'100%'}}>
                    <View style={{width:'80%',marginBottom:20,marginTop:40}}>
                        <TextInput value={name} onChangeText={text => onChangeName(text)} style={{height:52,width:'100%',color:'white',borderRadius:10,borderWidth:1,borderColor:'white',paddingLeft:10}} placeholderTextColor="#fff" placeholder="Full name" />  
                        <TextInput value={Email} onChangeText={text => onChangeEmail(text)} style={{height:52,width:'100%',color:'white',borderRadius:10,borderWidth:1,borderColor:'white',paddingLeft:10,marginTop:10}} placeholderTextColor="#fff" placeholder="Email" /> 
                        <TextInput keyboardType="numeric" value={Mobile} onChangeText={text => onChangeMobile(text)} style={{height:52,width:'100%',color:'white',borderRadius:10,borderWidth:1,borderColor:'white',paddingLeft:10,marginTop:10}} placeholderTextColor="#fff" placeholder="Mobile" />
                        <TextInput value={Password} onChangeText={text => onChangePassword(text)} secureTextEntry={true} style={{height:52,width:'100%',color:'white',borderRadius:10,borderWidth:1,borderColor:'white',paddingLeft:10,marginTop:10}} placeholderTextColor="#fff" placeholder="Password" />
                        <TextInput  value={ConfirmPassword} onChangeText={text => onChangeConfirmPassword(text)} secureTextEntry={true} style={{height:52,width:'100%',color:'white',borderRadius:10,marginTop:10,borderWidth:1,borderColor:'white',paddingLeft:10}} placeholderTextColor="#fff" placeholder="Confirm Password" />  
                    </View>
                    <Button buttonFunction={()=>validate()} bgcolor="#fff" text="Register" color={"#000"} outline={false}/>
                </ScrollView>
            </View>
            <Overlay isVisible={overlay}>
                <PopUp successBtn={()=>setOverlay("false")} errorBtn={()=>setOverlay(false)} text={OverlayText} error={popUpErr} />
            </Overlay>

            <Overlay isVisible={registered}>
                <PopUp successBtn={()=>SignUpSuccess()} text={"Welcome to WhatsOnSale, please check your inbox to verify your account."} />
            </Overlay>

            <Overlay isVisible={loader}>
                <Loader text={'Creating account, please wait..'}/>
            </Overlay>
        </>
    )
}

export default Register
const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'#DA0E2F',
        flexDirection:'column',
        justifyContent:'space-between'
    },
})