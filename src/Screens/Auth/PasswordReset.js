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
            <StatusBar  backgroundColor="white" barStyle="dark-content"/>
            <View style={style.body}>
                <View style={style.topSection}>
                    <Image style={{width:173,height:34,resizeMode:'contain',marginTop:30}} source={require('../../assets/textlogo.png')}/>
                </View>
                <ScrollView style={style.bottomSection} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                    <View style={{justifyContent:'center',alignItems:'center',height:'100%'}}>
                        <View style={{width:'95%',height:50, alignItems:'flex-start'}}>
                            <TouchableOpacity onPress={()=>navigation.navigate('signIn')}>
                                <Icon size={50} color={'#fff'} name='chevron-left' />
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'80%',marginBottom:20}}>
                            <Text style={{color:'#fff',fontSize:40,marginTop:10,marginBottom:30}}>Update {'\n'}password</Text> 
                            <TextInput value={email} onChangeText={text => onChangeEmail(text)} style={{height:52,width:'100%',color:'white',borderRadius:10,borderWidth:1,borderColor:'white',paddingLeft:10}} placeholderTextColor="#fff" placeholder="Email" />    
                        </View>
                        <Button buttonFunction={()=>validate()} bgcolor="#DA0E2F" text="Confirm" color={"white"} outline={false}/>
                    </View>
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
