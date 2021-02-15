import React, {useState} from 'react';
import {View, Text, StyleSheet,Image, TouchableOpacity, ScrollView} from 'react-native';
const SearchResult = (props)=>{
    return(
        <>
            <ScrollView>
                {
                    props.data.map(item=>{
                        return(
                            <TouchableOpacity onPress={()=>props.viewBrand(item)} style={style.searchResults}>
                                <View style={style.post}>
                                    <Image style={style.image} source={{uri:item.logo}}/>
                                    <View style={style.text}>
                                        <Text style={{fontSize:20,fontWeight:'bold'}}>{item.name}</Text>
                                        <Text style={{color:'#575757',width:200,marginTop:3,marginBottom:3}} numberOfLines={1}>{item.description}</Text>
                                        <Text style={{color:'#DA0E2F',width:200,fontSize:12}} numberOfLines={1}>{item.category}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </>
    )
}
export default SearchResult
const style = StyleSheet.create({
    searchResults:{
        alignItems:'center',
        width:'100%',
        marginTop:10,
        marginBottom:10,
    },

    image:{
        width:80,
        height:80,
        borderRadius:40,
        backgroundColor:'rgba(0, 0, 0, 0.06)',
        marginLeft:15,
        resizeMode:'cover',
    },
    text:{
        marginLeft:15,
    },
    post:{
        width:'95%',
        height:100,
        backgroundColor:'white',
        borderRadius:10,
        shadowColor: "#000",
        flexDirection:'row',
        alignItems:'center',
        shadowOffset: {
            // width: 0,
            // height: 1,
        },
        shadowOpacity: 0.25,
        // shadowRadius: 2.84,
        // elevation: 1
    },
})