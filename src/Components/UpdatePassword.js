import React, {useState} from 'react';
import {View,TextInput,StyleSheet} from 'react-native';
import Button from './Button';
import Loader from './Loader';
import { Overlay } from 'react-native-elements';
import PopUp from './PopUp';
import {authentication,firebase} from '../firebase/firebase';


const UpdatePassword = ()=>{
    const [overlay,setOverlay] = useState(false);
    const [updated,setUpdated] = useState(false);
    const [loader,setLoader] = useState(false);
    const [OverlayText,setOverlayText] = useState("");
    const [oldPassword,setOldPassword] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const resetPassword = ()=>{
        if(oldPassword == ""){
            showErr(true,"Please enter your current password");
        }
        else if(password == ""){
            showErr(true,"Please enter a new password");
        }
        else if(confirmPassword == ""){
            showErr(true,"Please confirm your password"); 
        }
        else if(password != confirmPassword){
            showErr(true,"Passwords do not match");
        }else{
            setLoader(true);
            var current_user = authentication.currentUser;
            const credential = firebase.auth.EmailAuthProvider.credential(
                current_user.email, 
                oldPassword
            );
            current_user.reauthenticateWithCredential(credential).then(function() {
                // User re-authenticated.
                current_user.updatePassword(password)
                .then(re=>{
                    setPassword("");
                    setConfirmPassword("");
                    setOldPassword("");
                    setLoader(false);
                    setUpdated(true)
                })
                .catch(err=>{
                    setLoader(false);
                    showErr(true,err.message);
                });
                // unable to reauthenticate user
              }).catch((error) =>{
                // An error happened.
                setLoader(false);
                showErr(true,"There was an error verifying your current password");

              });


        }
    }

    const showErr = (show_overlay,overlay_text)=>{
        setOverlay(show_overlay);
        setOverlayText(overlay_text);
    }

    return(
        <>
            <View style={{width:'100%',alignItems:'center'}}>
                <TextInput secureTextEntry={true} value={oldPassword} onChangeText={(text)=>setOldPassword(text)} placeholder={"Current password"} style={style.input}/>
                <TextInput secureTextEntry={true} value={password} onChangeText={(text)=>setPassword(text)} placeholder={"New password"} style={style.input}/>
                <TextInput secureTextEntry={true} value={confirmPassword} onChangeText={(text)=>setConfirmPassword(text)} placeholder={"Confirm new password"} style={style.input}/>
                <Button buttonFunction={resetPassword} bgcolor="#000" text="Update Password" color={"black"} outline={true}/>
            </View>

            <Overlay isVisible={overlay}>
                <PopUp errorBtn={()=>setOverlay(false)} text={OverlayText} error={true} />
            </Overlay>

            <Overlay isVisible={updated}>
                <PopUp successBtn={()=>setUpdated(false)} text={"Password reset successful."} />
            </Overlay>

            <Overlay isVisible={loader}>
                <Loader text={'Updating password, please wait..'}/>
            </Overlay>
        </>
    )
}

export default UpdatePassword
const style = StyleSheet.create({
    input:{
        flexDirection: 'row',
        width:'95%',
        alignItems: 'center',
        backgroundColor:'rgba(0, 0, 0, 0.06)',
        borderRadius:10,
        height:40,
        marginTop:10,
        paddingLeft:10,
    }
})