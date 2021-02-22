import React, {useState,createRef} from 'react';
import {View, Text, FlatList, Image,StyleSheet,useWindowDimensions,TouchableOpacity,ScrollView} from 'react-native';
import ActionSheet from "react-native-actions-sheet";
const BrandPosts = (props)=>{
    const width = useWindowDimensions().width;
    const actionSheetRef = createRef();
    const [post,setPost] = useState({"title":"","cover":"","description":"","products_count":0,"views_count":0,"comments_count":0,"likes_count":0});
    const viewPost = (item)=>{
        props.viewPost(item);
    }
    return(
        <>
            <View style={{width:'100%',"flexDirection":'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                <FlatList
                    contentContainerStyle={{"flexDirection":'column',height:'100%'}}
                    data={props.data} 
                    keyExtractor={item => item.postId}
                    numColumns={3} 
                    renderItem={({item,index})=>(
                        <TouchableOpacity onPress={()=>viewPost(item)}>
                            <Image  source={{uri:item.cover}} key={item.postId} style={[style.post,{width:width*0.3,height:width*0.3}]}>
                            </Image>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </>
    )
}

export default BrandPosts
const style = StyleSheet.create({
    postsSection:{
        width:'95%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    post:{
        marginLeft:5,
        marginTop:15,
        backgroundColor:'rgba(0, 0, 0, 0.06)',
        resizeMode:'cover',
        borderRadius:10,
        alignItems:'flex-start'
    },
    option:{
        width:'100%',
        height:40,
        justifyContent:'space-between',
        backgroundColor:'rgba(0, 0, 0, 0.02)',
        flexDirection:'row',
        alignItems:'center',
    }
})