import React,{useState,useEffect} from 'react';
import {View, Text, StyleSheet,Image, TextInput} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import PageHeader from '../../Components/Header';
import {authentication} from '../../firebase/firebase';
import { CheckBox } from 'react-native-elements';

const Profile = ()=>{
    const buttons = ['Following','Profile',"Basket"]
    const [index,setIndex] = useState(1);
    const [UserName,setUserName] = useState("");
    const [UserEmail,setUserEmail] = useState("");
    const [UserMobile,setUserMobile] = useState("");
    const [UserImage,setUserImage] = useState("");
    const [UserAccesptsBaskets,setUserAccesptsBaskets] = useState(false);

    useEffect(()=>{
        fetch("https://7deeed01e5c3.ngrok.io/api/getAccount?userId="+authentication.currentUser.uid)
        .then(re=>re.json())
        .then(re=>{
            console.log(re);
            setUserName(re.data.name);
            setUserEmail(re.data.email);
            setUserMobile(JSON.stringify(re.data.mobile));
            setUserImage(re.data.image);
            setUserAccesptsBaskets(re.data.accept_shared_baskets);
        })
    },[])

    return(
        <View style={{flex:1,width:'100%',alignItems:'center'}}>
            <Image style={{width:80, height:80, borderRadius:40,backgroundColor:'rgba(0, 0, 0, 0.06)', marginTop:20}}/>
            <ButtonGroup
                onPress={(i)=>setIndex(i)}
                selectedIndex={index}
                buttons={buttons}
                containerStyle={{height: 40,marginTop:20,width:'95%'}}
                selectedButtonStyle={{backgroundColor:'#DA0E2F'}}
            />

            <View style={{width:'95%'}}>
                <Text style={{color:'#575757',marginTop:20,fontSize:13}}>Fullname</Text>
                <TextInput onChangeText={(text)=>setUserName(text)} style={{borderBottomWidth:1,marginTop:10,borderBottomColor:'rgba(0, 0, 0, 0.06)'}} value={UserName}/>

                <Text style={{color:'#575757',marginTop:30,fontSize:13}}>Email</Text>
                <TextInput onChangeText={(text)=>setUserEmail(text)} style={{borderBottomWidth:1,marginTop:10,borderBottomColor:'rgba(0, 0, 0, 0.06)'}} value={UserEmail}/>

                <Text style={{color:'#575757',marginTop:30,fontSize:13}}>Mobile</Text>
                <TextInput onChangeText={(text)=>setUserMobile(text)} style={{borderBottomWidth:1,marginTop:10,borderBottomColor:'rgba(0, 0, 0, 0.06)'}} value={UserMobile}/>

                <Text style={{color:'#575757',marginTop:30,fontSize:13}}>Accept shared baskets</Text>
                <CheckBox onPress={()=>setUserAccesptsBaskets(!UserAccesptsBaskets)} checkedColor={"#DA0E2F"} checked={UserAccesptsBaskets} />

            </View>
            {/* <Text onPress={()=>authentication.signOut()}>Sign Out</Text>  */}
        </View>
    )
}

export default Profile
const style = StyleSheet.create({
    top:{
        width:'95%',
        marginTop:20,
        alignItems:'flex-start',
        paddingBottom:20
        
    },
    title:{
        fontSize: 30,
        fontWeight:'bold'
    },
})