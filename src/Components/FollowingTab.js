import React, {useEffect,useState} from 'react';
import {View, Text, Image,ScrollView,StyleSheet,RefreshControl} from 'react-native';
import {authentication} from '../firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
const FollowingTab = (props)=>{
    const [brands,setBrands] = useState([]);
    const [loader,setLoader] = useState(false);
    useEffect(()=>{
        getFollowedBrandsFromStorage();
    },[])

    const getFollowedBrands = async ()=>{
        setLoader(true);
        fetch("https://501af1adc866.ngrok.io/api/getFollowing?userId="+authentication.currentUser.uid)
        .then(re=>re.json())
        .then(re=>{
            setLoader(false);
            setBrands(re.data);
            AsyncStorage.setItem('following', JSON.stringify(re.data));
        });
    }


    const getFollowedBrandsFromStorage = async ()=>{
        setLoader(true);
        try{
            // getFollowedBrands();
            const following = await AsyncStorage.getItem('following');
            if(following != null && JSON.parse(following).length != 0){
                const json_following = JSON.parse(following);
                setBrands(json_following)
                setLoader(false);
            }else{
                getFollowedBrands();
            }
 
        }catch{
            getFollowedBrands();
        }
    }


    return(
        <ScrollView style={{width:'95%'}}
        refreshControl={
            <RefreshControl
              refreshing={loader}
              onRefresh={getFollowedBrands}
            />
          }
        >
            {loader==true?null:
                brands.map(item=>{
                    return(
                        <TouchableOpacity onPress={()=>props.viewBrand(item)} key={item.id} style={style.searchResults}>
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
    )
}

export default FollowingTab
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