import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet,Image,useWindowDimensions,Linking} from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {authentication} from '../firebase/firebase';

const Brand = ({navigation,route})=>{
    const [brand,setBrand] = useState(route.params.data);
    const [PostCount,setPostCount] = useState(0);
    const [following,setFollowing] = useState(false);
    const [FollowersCount,setFollowersCount] = useState(0);
    const width = useWindowDimensions().width;

    useEffect(()=>{
        // get the number of posts and followers
        console.log(brand)
        setFollowing(brand.following);
        setPostCount(brand.post_count);
        setFollowersCount(brand.follower_count);
    },[])

    const follow = (type)=>{
        if(type == "follow"){
            setFollowing(true);
            setFollowersCount(FollowersCount+1);
        }else{
            setFollowing(false);
            setFollowersCount(FollowersCount-1);
        }
        fetch("https://8589034e15a7.ngrok.io/api/followBrand?id="+brand.id+"&userId="+authentication.currentUser.uid)
        .then(re=>re.json())
        .then(re=>{
            // console.log(re);
        })
    }

    return(
        <View style={style.page}>
            <View style={style.top}>
                <View style={{alignItems:'center'}}>
                    <Image style={style.image} source={{uri:brand.logo}}/>
                    {following == false?
                        <Button onPress={()=>follow("follow")} titleStyle={{color:'#fff'}} buttonStyle={style.button} title={"Follow"}/>
                        :
                        <Button onPress={()=>follow("unfollow")} titleStyle={{color:'#fff'}} buttonStyle={style.FollowingButton} title={"Following"}/>
                    }
                </View>
                <View style={{marginLeft:20}}>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>{brand.name}</Text>
                    <Text style={{color:'#575757',width:200,marginTop:3,marginBottom:3,fontSize:12}}>{brand.category}</Text>
                    <Text style={{color:'#575757',fontSize:13,textAlign:'left',width:width/1.8}} numberOfLines={3}>
                        {brand.description}
                    </Text>
                </View>
            </View>

            <View style={style.brandStats}>
                <View>
                    <Text style={style.statTitle}>{PostCount}</Text>
                    <Text style={{color:'#575757',fontSize:13,marginTop:3}}>Posts</Text>
                </View>
                <View>
                    <Text style={style.statTitle}>{FollowersCount}</Text>
                    <Text style={{color:'#575757',fontSize:13,marginTop:3}}>Follower/s</Text>
                </View>
                <TouchableOpacity onPress={()=>Linking.openURL(brand.website)}>
                    <Text style={{color:'#DA0E2F',textDecorationLine:'underline',fontSize:13}}>Visit website</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Brand
const style = StyleSheet.create({
    page:{
        width:'100%',
        alignItems:'center'
    },
    top:{
        width:'95%',
        marginTop:20,
        flexDirection:'row',
        alignItems:'center'
    },
    image:{
        width:80,
        height:80,
        borderRadius:40,
        backgroundColor:'rgba(0, 0, 0, 0.06)',
        resizeMode:'cover',
    },
    button:{
        backgroundColor:'#000',
        borderRadius:10,
        height:35,
        width:100,
    },
    FollowingButton:{
        backgroundColor:'#DA0E2F',
        borderRadius:10,
        height:38,
        width:100,
    },
    brandStats:{
        width:'95%',
        height:80,
        backgroundColor:'#fff',
        borderRadius:10,
        marginTop:20,
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'row',
    },
    statTitle:{
        fontSize:20,
        fontWeight:'bold',
    }

})