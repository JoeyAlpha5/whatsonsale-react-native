import React, {useEffect,useState} from 'react';
import {TouchableOpacity,FlatList,Image,StyleSheet} from 'react-native';
const Trending = (props)=>{

    return(
        <FlatList
            data={props.trends}
            horizontal
            showsVerticalScrollIndicator ={false}
            showsHorizontalScrollIndicator ={false}
            keyExtractor={( item,index ) => {return index.toFixed()} }
            renderItem={({item,index})=>(
                <TouchableOpacity onPress={()=>props.viewTrend(index)}>
                    <Image style={style.trendingImage} source={{uri:item.brand.logo}}/>
                </TouchableOpacity>
            )}

        
        />
    )
}
export default Trending
const style = StyleSheet.create({
    trendingImage:{
        width:60,
        height:60,
        borderRadius:50,
        marginLeft:15,
        marginBottom:10,
        marginTop:10,
    }
})