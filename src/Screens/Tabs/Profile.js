import React,{useState,useEffect} from 'react';
import {View,StyleSheet,Image,Text, TouchableOpacity,Platform} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import ProfileTab from '../../Components/ProfileTab';
import FollowingTab from '../../Components/FollowingTab';
import Wallet from '../../Components/Wallet';
import {authentication} from '../../firebase/firebase';
import {launchImageLibrary} from 'react-native-image-picker';

const Profile = ({navigation})=>{
    const buttons = ['Following','Profile',"Sharebox", "Wallet"]
    const [index,setIndex] = useState(1);
    const [profileImage,setProfileImage] = useState("");
    const options = {mediaType:"photo"};
    const aws_url = "https://whatsonsale-development.s3.amazonaws.com/";

    useEffect(()=>{
        var user_id = authentication.currentUser.uid;
        fetch(`https://whatsonsale-test.herokuapp.com/api/getProfileImage?userId=${user_id}`)
        .then(re=>re.json())
        .then(re=>{
            setProfileImage(re.profile_image);
        })
    },[profileImage])

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
        navigation.navigate('brand', {data:brand, updateFollowing:updateFollowing});
    }

    // function that's executed when you click follow button on retailer profile
    const updateFollowing = ()=>{
        // console.log("update following on profile tab");
    }

    const updateProilePic = (obj)=>{
        if(obj.fileName){
            var data = new FormData();
            var photo = {
                name:obj.fileName,
                type:obj.type,
                uri: Platform.OS === "android" ? obj.uri : obj.uri.replace("file://", "")
            }
            data.append("profile_image",photo);
            data.append("userId", authentication.currentUser.uid);
            // update profile image
            fetch('https://whatsonsale-test.herokuapp.com/api/updateProfileImage', {
                method: 'POST',
                body:data,
            })
            .then(re=>re.json())
            .then(re=>{
                setProfileImage(re.profile_image);
            })
        }
    }

    return(
        <View style={{flex:1,width:'100%',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>launchImageLibrary(options, updateProilePic)}><Image source={{uri:aws_url+profileImage}} style={{width:80, height:80, borderRadius:40,backgroundColor:'rgba(0, 0, 0, 0.06)', marginTop:20}}/></TouchableOpacity>
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