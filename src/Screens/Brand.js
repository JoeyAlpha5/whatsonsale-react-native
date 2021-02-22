import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet,Image,Linking,ActivityIndicator,useWindowDimensions} from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {authentication} from '../firebase/firebase';
import BrandPosts from '../Components/BrandPosts';

const Brand = ({navigation,route})=>{
    const [brand,setBrand] = useState(route.params.data);
    const [PostCount,setPostCount] = useState(0);
    const [following,setFollowing] = useState(false);
    const [posts,setPosts] = useState([]);
    const [gotPosts,setGotPosts] = useState(false);
    const [FollowersCount,setFollowersCount] = useState(0);
    const width = useWindowDimensions().width;
    const userId = authentication.currentUser.uid;

    useEffect(()=>{
        // get the number of posts and followers
        getBrandPosts();
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
        fetch("https://f86d6cde6223.ngrok.io/api/followBrand?id="+brand.id+"&userId="+userId)
        .then(re=>re.json())
        .then(re=>{
            // console.log(re);
        })
    }

    const getBrandPosts = ()=>{
        fetch("https://f86d6cde6223.ngrok.io/api/getBrandPosts?brandId="+brand.id+"&userId="+userId)
        .then(re=>re.json())
        .then(re=>{
            setPosts(re.data);
            setGotPosts(true);
        })
    }

    const viewPost = (post)=>{
        var post_index = posts.indexOf(post);
        navigation.navigate("post",{data:{"post":post,"brand":brand,"index":post_index,"updatePostArray":getBrandPosts}});
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

            <View style={style.postsSection}>
                    {gotPosts == false?
                        <ActivityIndicator style={{marginTop:10}} size="small" color="#000000"/>:
                        <BrandPosts data={posts} viewPost={viewPost}/>
                    }
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
    postsSection:{
        width:'95%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    statTitle:{
        fontSize:20,
        fontWeight:'bold',
    },
    post:{
        marginLeft:5,
        marginTop:15,
        backgroundColor:'rgba(0, 0, 0, 0.06)',
        resizeMode:'cover',
        borderRadius:10,
        alignItems:'flex-start'
    }

})