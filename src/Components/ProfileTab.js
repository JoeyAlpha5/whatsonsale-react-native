import React, {useEffect,useState} from 'react';
import {View, Text,TextInput, ActivityIndicator, ScrollView} from 'react-native';
import {authentication} from '../firebase/firebase';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Overlay } from 'react-native-elements';
import Button from './Button';
import PopUp from './PopUp';
const ProfileTab = ()=>{
    // validation states
    const [overlay,setOverlay] = useState(false);
    const [OverlayText,setOverlayText] = useState("");
    // user profile
    const [Profile,setProfile] = useState(false);
    const [UserName,setUserName] = useState("");
    const [UserEmail,setUserEmail] = useState("");
    const [UserMobile,setUserMobile] = useState("");
    const [UserAcceptsBaskets,setUserAcceptsBaskets] = useState(false);
    useEffect(()=>{
        renderProfileFromLocalStorage();
    },[])

    const getProfile = async ()=>{
        fetch("https://8589034e15a7.ngrok.io/api/getAccount?userId="+authentication.currentUser.uid)
        .then(re=>re.json())
        .then(re=>{
            setProfile(true);
            setUserName(re.data.name);
            setUserEmail(re.data.email);
            setUserMobile("0"+JSON.stringify(re.data.mobile));
            setUserAcceptsBaskets(re.data.accept_shared_baskets);
            // store profile in local storage
            AsyncStorage.setItem('profile', JSON.stringify(re.data));
        })
    }

    const renderProfileFromLocalStorage = async ()=>{
        try {
            const profile = await AsyncStorage.getItem('profile')
            if(profile != null){
                const json_profile = JSON.parse(profile);
                setProfile(true);
                setUserName(json_profile.name);
                setUserEmail(json_profile.email);
                setUserMobile(0+JSON.stringify(json_profile.mobile));
                setUserAcceptsBaskets(json_profile.accept_shared_baskets);

            }else{
                getProfile();
            }
        }catch {
            getProfile();
        }
    }

    const updateProfile = ()=>{
        setProfile(false);
        var current_user = authentication.currentUser;
        current_user.updateEmail(UserEmail)
        .then(()=>{
            fetch('https://8589034e15a7.ngrok.io/api/updateAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:"name="+UserName+"&email="+UserEmail+"&accept_shared_baskets="+UserAcceptsBaskets+"&mobile="+UserMobile+"&userId="+authentication.currentUser.uid,
            })
            .then(re=>re.json())
            .then(re=>{
                console.log(re);
                getProfile();
            })
        })
        .catch((err)=>{
            showErr(true,"Unable to update email, please check your email address.");
            setProfile(true);
        })


    }

    const validateInput = ()=>{
        var fullname_has_spacing = UserName.includes(" ");
        var index_of_spacing = UserName.indexOf(" ");
        var second_name = UserName.substring(index_of_spacing+1);
        var first_name = UserName.substring(0,index_of_spacing);
        // 
        if(UserName,UserEmail,UserMobile == ''){
            showErr(true,"Unable to update account \n please fill in all fields");
        }else if(isNaN(UserMobile) || UserMobile.length < 10 || UserMobile[0] != '0' || UserMobile.length > 10){
            showErr(true,"Unable to update account \n please enter a valid 10 digit mobile number");
        }else if(fullname_has_spacing == false){
            showErr(true,"Unable to update account \n please enter your fullname");
        }else if(first_name.length < 2){
            showErr(true,"Unable to update account \n a valid first name must have 2 characters or more");
        }else if(second_name.length < 2){
            showErr(true,"Unable to update account \n a valid last name must have 2 characters or more");
        }else{
            updateProfile();
        }
    }

    const showErr = (show_overlay,overlay_text)=>{
        setOverlay(show_overlay);
        setOverlayText(overlay_text);
    }

    return(


        <ScrollView style={{width:'95%'}}>
            {Profile == false?
                <ActivityIndicator size="small" color="#000000" />
                :
                (
                    <View style={{width:'95%'}}>
                        <Text style={{color:'#575757',marginTop:20,fontSize:13}}>Fullname</Text>
                        <TextInput onChangeText={(text)=>setUserName(text)} style={{borderBottomWidth:1,marginTop:10,borderBottomColor:'rgba(0, 0, 0, 0.06)'}} value={UserName}/>
            
                        <Text style={{color:'#575757',marginTop:30,fontSize:13}}>Email</Text>
                        <TextInput onChangeText={(text)=>setUserEmail(text)} style={{borderBottomWidth:1,marginTop:10,borderBottomColor:'rgba(0, 0, 0, 0.06)'}} value={UserEmail}/>
            
                        <Text style={{color:'#575757',marginTop:30,fontSize:13}}>Mobile</Text>
                        <TextInput onChangeText={(text)=>setUserMobile(text)} style={{borderBottomWidth:1,marginTop:10,borderBottomColor:'rgba(0, 0, 0, 0.06)'}} value={UserMobile}/>
            
                        <Text style={{color:'#575757',marginTop:30,fontSize:13}}>Accept shared baskets</Text>
                        <CheckBox onPress={()=>setUserAcceptsBaskets(!UserAcceptsBaskets)} checkedColor={"#DA0E2F"} checked={UserAcceptsBaskets} />

                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Button buttonFunction={validateInput} bgcolor="#DA0E2F" text="Update" color={"white"} outline={false}/>
                        </View>
                    </View>
                )
            }
            <Overlay isVisible={overlay}>
                <PopUp errorBtn={()=>setOverlay(false)} text={OverlayText} error={true} />
            </Overlay>
        </ScrollView>

    )
}

export default ProfileTab