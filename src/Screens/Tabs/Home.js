import React, {useEffect,useState,useRef} from 'react';
import {View, Text,StatusBar,FlatList,ActivityIndicator,RefreshControl} from 'react-native';
import {authentication} from '../../firebase/firebase';
import { useScrollToTop } from '@react-navigation/native';
import Post from '../../Components/Post';
const Home = ({navigation,route})=>{
    const ref = useRef(null);
    useScrollToTop(ref);
    const [feed,setFeed] = useState([]);
    const [postIds,setPostIds] = useState([]);
    const [Refreshing,setRefreshing] = useState(false);
    const [morePostToLoad,setMorePostToLoad] = useState(true);
    const [gotFeed,setGotFeed] = useState(false);
    useEffect(()=>{
        // check if user is signed in
        authentication.onAuthStateChanged((user)=>{
            if(!user){
                route.params.authenticate(false);
            }else{
                getFeed(authentication.currentUser.uid,true);
            }
        });
    },[]);


    const getFeed = (userId,resetFeed)=>{
        var feed_count = feed.length;
        if (resetFeed == true){
            feed_count = 0;
        }
        fetch("https://543bba26ff28.ngrok.io/api/getFeed?userId="+userId+"&feedCount="+feed_count)
        .then(re=>re.json())
        .then(re=>{
            setRefreshing(false);
            setGotFeed(true);
            if(re.data.length == 0){
                setMorePostToLoad(false);
            }else{
                if(resetFeed == true){
                    setFeed(re.data);
                    // set posts ids to be used to identify duplicates
                    // var post_ids = [];
                    // for(var count = 0; count < re.data.length; count++){
                    //     post_ids.push(re.data[count].post.postId);
                    // }
                    // setPostIds(post_ids);
                }else{
                    // resolve duplicates
                    // var new_feed = [];
                    // var post_ids = [];
                    // for(var count = 0; count < re.data.length; count++){
                    //     if(!postIds.includes(re.data[count].post.postId)){
                    //         new_feed.push(re.data[count]);
                    //         post_ids.push(re.data[count].post.postId)
                    //     }
                    // }
                    setFeed([...feed,...re.data])
                    // setPostIds([...postIds,...post_ids]);
                }
            }
        });
    }

    // when user drags down to refresh
    const onRefresh = ()=>{
        setRefreshing(true);
        setMorePostToLoad(true);
        getFeed(authentication.currentUser.uid,true);

    }

    // when user reaches the end of the feed
    const getMore = ()=>{
        if(morePostToLoad == true){
            getFeed(authentication.currentUser.uid,false);
        }
    }

    // view post products
    const viewProducts = (post)=>{
        navigation.navigate("products",{data:post});
    }

    // view store locatioons
    const viewLocations = (post)=>{
        navigation.navigate("locations",{data:post});
    }

    const viewBrand = (brand)=>{
        navigation.navigate('brand', {data:brand,updateFollowing:updateFollowing});
    }

    const updateFollowing = ()=>{
        setFeed([]);
        setMorePostToLoad(true);
        setGotFeed(false);
        getFeed(authentication.currentUser.uid,true);
    }

    return(
        <View style={{flex:1}}>
            <StatusBar  backgroundColor="#fff" barStyle="dark-content"/>
            {gotFeed == false?
                (
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',height:'100%'}}>
                        <ActivityIndicator style={{marginTop:20}} size="large" color="#000000" /> 
                    </View>
                )
                :
                (
                    <FlatList
                        data={feed}
                        ref={ref}
                        showsVerticalScrollIndicator ={false}
                        onEndReached={getMore}
                        onEndReachedThreshold={1}
                        ListFooterComponent={morePostToLoad == true ? <ActivityIndicator style={{marginTop:5}} size="small" color="#000000"/>:<View style={{marginTop:10,marginBottom:30,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:12,color:"#575757"}}>You've viewed all posts from your favourite brands.</Text></View>}
                        refreshControl={<RefreshControl colors={['#000000']} refreshing={Refreshing} onRefresh={onRefresh}/>} 
                        keyExtractor={( item,index ) => {return item.post.postId.toFixed()} }
                        renderItem={({item,index})=>(
                            <Post data={item} viewBrand={viewBrand} viewProducts={viewProducts} viewLocations={viewLocations}/>
                        )}
                    />
                )
                    
            }

        </View>
    )
}

export default Home