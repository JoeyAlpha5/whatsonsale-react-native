import React, {useEffect,useState,useCallback} from 'react';
import { useFocusEffect} from '@react-navigation/native';
import {View, Text,ActivityIndicator,useWindowDimensions,StyleSheet,Image,FlatList,TouchableOpacity} from 'react-native';
import {authentication} from '../../firebase/firebase';
const BasketTab = ()=>{
    const width = useWindowDimensions().width;
    const [products,setProducts] = useState([]);
    const [basketExists,setBasketExists] = useState(false);
    const [preview,setPreview] = useState(1);
    let localization = {style:'currency', currency: 'ZAR'};
    let displayAsCurrency = (value) => new Intl.NumberFormat('en-ZA', localization).format(value);
   
    useFocusEffect(
        useCallback(() => {
            getBasket();
          }, [])
    )

    const removeFromBasket = (id)=>{
        setProducts([]);
        fetch(`https://whatsonsale-test.herokuapp.com/api/removeFromBasket?userId=${authentication.currentUser.uid}&basketId=${id}`)
        .then(re=>re.json())
        .then(re=>{
            getBasket();
        })
    }

    const getBasket = ()=>{
        fetch(`https://whatsonsale-test.herokuapp.com/api/getBasket?userId=${authentication.currentUser.uid}`)
        .then(re=>re.json())
        .then(re=>{
            setProducts(re.data);
            setBasketExists(true);
        })
    }
    return(
        <View>
            <Text style={{marginLeft:15,marginTop:15,fontSize:18,fontWeight:'bold',color:'#DA0E2F'}}>Basket</Text>
            <Text style={{marginLeft:15,marginTop:5,marginBottom:20,color:'#575757',width:'90%'}}>
                Create a custom shopping basket of several 
                sale items or products.
            </Text>
            <View style={{justifyContent:'center',alignItems:'center',marginBottom:200}}>
                {basketExists == false?  
                    (
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',height:'100%'}}>
                            <ActivityIndicator style={{marginTop:100}} size="small" color="#000000" /> 
                        </View>
                    )
                    :
                    (

                        <FlatList
                            contentContainerStyle={{width:width}}
                            data={products} 
                            keyExtractor={item => item.id}
                            // numColumns={3} 
                            renderItem={({item,index})=>(
                                <View style={{width:'100%',flexDirection:'column',backgroundColor:'#ffffff',borderTopColor:'rgba(0, 0, 0, 0.06)',borderTopWidth:0.5}}>
                                    <TouchableOpacity style={{width:'50%'}} onPress={()=>removeFromBasket(item.id)}><Text style={{marginTop:15,marginLeft:15,marginBottom:15,color:'#575757',fontWeight:'bold',fontSize:12}}>Remove from basket</Text></TouchableOpacity>
                                    <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
                                            <View style={{flexDirection:'row'}}>
                                                <Image source={{uri: item.brand_logo}} style={style.image}/>
                                                <View style={{marginLeft:15,justifyContent:'center'}}>
                                                    <Text style={{fontWeight:'bold'}}>{item.name}</Text>
                                                    <Text>{displayAsCurrency(item.price)}</Text>
                                                </View>
                                            </View>

                                            <View style={{marginRight:15}}>
                                                {preview == item.id?
                                                    <TouchableOpacity onPress={()=>setPreview(null)}>
                                                        <Text style={{fontSize:12,color:'#575757',opacity:0.6}}>Hide Image</Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity onPress={()=>setPreview(item.id)}>
                                                        <Text style={{fontSize:12,color:'#575757',opacity:0.6}}>View Image</Text>
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                    </View>
                                    {preview == item.id?
                                        <View style={{width:width,justifyContent:'center',alignItems:'center',marginBottom:20}}>
                                            <Image source={{uri:item.image}} style={[style.postImage,{width:width*0.60,height:width*0.60,borderRadius:5}]}/>
                                        </View>
                                        :
                                        null                                        
                                    }
                                </View>
                            )}
                        />
                    )
                }
            </View>
        </View>
    )
}

export default BasketTab
const style = StyleSheet.create({
    image:{
        width:40,
        height:40,
        borderRadius:40,
        backgroundColor:'rgba(0, 0, 0, 0.06)',
        resizeMode:'cover',
        marginLeft:10,
        borderColor: 'rgba(0, 0, 0, 0.06)',
        borderWidth: 1,  
    },
})