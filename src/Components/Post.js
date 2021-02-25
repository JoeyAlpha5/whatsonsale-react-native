import React, {useEffect,useState,createRef} from 'react';
import {Text,View,StyleSheet, Image, useWindowDimensions,TouchableOpacity} from 'react-native';
import dateFormat from "dateformat";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {authentication} from '../firebase/firebase';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';


const Post = (props)=>{
    const [item,setItem] = useState({"brand":{},"post":{}});
    const [catalogue,setCatalogue] = useState([]);
    const [paused,setPaused] = useState(true);
    const width = useWindowDimensions().width;

    useEffect(()=>{
        setItem(props.data);
        if(props.data.post.catalogue.length != 0 ){
            setCatalogue(JSON.parse(props.data.post.catalogue));
        }
        // console.log(Item);
    },[]);

    const like = ()=>{
        new_item = item;
        if(new_item.post.user_liked_post == true){
            new_item.post.user_liked_post = false;
            new_item.post.likes_count = new_item.post.likes_count - 1;
        }else{
            new_item.post.user_liked_post = true;
            new_item.post.likes_count = new_item.post.likes_count + 1;
        }
        // update database
        fetch('https://543bba26ff28.ngrok.io/api/postLike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:"postId="+new_item.post.postId+"&userId="+authentication.currentUser.uid,
        })
        .then(re=>re.json())
        .then(re=>{
            // update brand's post array
            // props.data.updatePostArray();
            console.log("success")
        })

        // merge state change
        setItem(prevState => {
            // Object.assign would also work
            return {...prevState, ...new_item};
        });
    }

    const comment = ()=>{

    }

    const viewProducts  = ()=>{

    }

    const updateViewsCount = ()=>{

    }

    const renderSlider= ()=>{

    }


    return(
        <View style={style.view}>
            <View style={style.post}>
                {/* top section of post */}
                <View style={style.postTopSection}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>props.viewBrand(item.brand)}><Image style={style.image} source={{uri:item.brand.logo}} /></TouchableOpacity>
                        <View style={{marginLeft:15}}>
                            <TouchableOpacity onPress={()=>props.viewBrand(item.brand)}><Text style={{fontWeight:'bold'}}>{item.brand.name}</Text></TouchableOpacity>
                            <Text style={{color:'#575757',fontSize:11}}>{dateFormat(item.post.date, "mmmm dS, yyyy")}</Text>
                        </View>
                    </View>
                    <View style={{marginRight:15,flexDirection:'row',alignItems:'center'}}>
                        <View style={{alignItems:'center',marginRight:5}}>
                            <TouchableOpacity onPress={()=>props.viewLocations(item.post)}><Ionicons name="location-outline" size={20}/></TouchableOpacity>
                            <Text></Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>props.viewProducts(item.post)}><Ionicons name="cart-outline" size={20}/></TouchableOpacity>
                            <Text>{item.post.products_count}</Text>
                        </View>
                    </View>
                </View>

                {/* render post image/s or video */}
                {item.post.is_video?
                    (
                        <View>
                            <TouchableOpacity onPress={()=>setPaused(!paused)}>
                                <Video repeat={true} source={{uri: catalogue[0].fields.image}} paused={paused} style={{width:width*0.90,height:width*0.90, backgroundColor:'#000000',marginTop:10}}  />
                            </TouchableOpacity>
                            <Ionicons name="ios-videocam-outline" size={22} color="#575757"/>
                        </View>
                        
                    ):

                    (
                        <View style={{width:width*0.90,height:width*0.90}}>
                            {/* if post has catalogue render swiper if not just render the post cover */}
                            {catalogue.length > 0?
                                (
                                    <Swiper prevButton={<></>} nextButton={<></>} width={width*0.90} height={width*0.90}  loadMinimalSize={0} autoplay={false} loadMinimal={true} autoplayTimeout={20} showsButtons={false} dotColor={'#575757'} activeDotColor={'#fff'}  style={style.wrapper} showsButtons={true}>
                                        <Image style={[style.postImage,{width:width*0.90,height:width*0.90}]} source={{uri:item.post.cover}}/>
                                        {
                                            catalogue.map(slide=>{
                                                return(
                                                    <Image key={slide.fields.pk} style={[style.postImage,{width:width*0.90,height:width*0.90}]} source={{uri:slide.fields.image}}/>
                                                )
                                            })
                                        }
                                    </Swiper>
                                ):
                                <Image style={[style.postImage,{width:width*0.90,height:width*0.90}]} source={{uri:item.post.cover}}/>
                            }
                        </View>
                    )

                }



                {/* post description */}
                <View style={{alignItems:'flex-start',width:'100%'}}>
                    <Text style={{marginLeft:15,marginTop:20,color:'#DA0E2F',fontWeight:'bold'}}>{item.post.title}</Text>
                    <Text style={{marginLeft:15,color:'#575757',width:'90%',fontSize:12}}>{item.post.description}</Text>
                    <View style={{flexDirection:'row',marginTop:10,alignItems:'center',justifyContent:'space-between',width:'100%'}}>
                        <View style={{flexDirection:'row',marginLeft:15,alignItems:'center'}}>
                            {item.post.user_liked_post == true? <TouchableOpacity onPress={like}><Ionicons name="heart" size={22} color="#DA0E2F"/></TouchableOpacity>:<TouchableOpacity onPress={like}><Ionicons name="heart-outline" size={22} color="#575757"/></TouchableOpacity> }
                            <Text style={{color:"#575757",fontSize:12}}>{item.post.likes_count}</Text>
                            <Ionicons style={{marginLeft:12}} name="eye-outline" size={22} color="#575757"/>
                            <Text style={{color:"#575757",fontSize:12}}>{item.post.views_count}</Text>
                            <Ionicons style={{marginLeft:12}} name="share-social-outline" size={22} color="#575757"/>
                        </View>
                        <View style={{flexDirection:'row',marginRight:15,alignItems:'center'}}>
                            <Text style={{color:"#575757",fontSize:12}}>{item.post.comments_count}</Text>
                            <Ionicons name="chatbubble-ellipses-outline" size={22} color="#575757"/>
                        </View>
                    </View>
                </View>
            </View> 
        </View>
    );
}
export default Post
const style = StyleSheet.create({
    view:{
        justifyContent:'center',
        width:'100%',
        alignItems:'center',
    },
    post:{
        width:'98%',
        // height:500,
        paddingBottom:25,
        backgroundColor:'#fff',
        marginTop:10,
        borderRadius:10,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 5,
        alignItems:'center'
    },
    postTopSection:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10
    },
    image:{
        width:60,
        height:60,
        borderRadius:40,
        backgroundColor:'rgba(0, 0, 0, 0.06)',
        resizeMode:'cover',
        marginLeft:10,
        borderColor: 'rgba(0, 0, 0, 0.06)',
        borderWidth: 1,  
    },
    postImage:{
        backgroundColor:'rgba(0, 0, 0, 0.06)',
        marginTop:10,
        resizeMode:'cover',
        // flex:1,
        // width:width/0.5,
        // height:200,
        borderRadius:10,
        // width:350

    },
    wrapper: {
        // backgroundColor:'red'
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },


})