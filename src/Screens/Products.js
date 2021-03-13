import React, {useEffect,useState} from 'react';
import {View, Text,StyleSheet, FlatList,TouchableOpacity,Image,useWindowDimensions} from 'react-native';
import {authentication} from '../firebase/firebase';
import {Overlay} from 'react-native-elements';

const Products = ({navigation,route})=>{
    const [products,setProducts] = useState([]);
    const [product,setProduct] = useState();
    const [viewOverlay,setViewOverlay] = useState(false);
    const [basketText,setBasketText] = useState("add");
    const width = useWindowDimensions().width;
    let localization = {style:'currency', currency: 'ZAR'};
    let displayAsCurrency = (value) => new Intl.NumberFormat('en-ZA', localization).format(value);
    let userId = authentication.currentUser.uid;
    useEffect(()=>{
        fetch(`https://whatsonsale-test.herokuapp.com/api/getPostProducts?userId=${userId}&postId=${route.params.data.postId}`)
        .then(re=>re.json())
        .then(re=>{
            var response_data = JSON.parse(re.data);
            setProducts(response_data);
        })
    },[])


    const viewProduct = (product)=>{
        setViewOverlay(true);
        setProduct(product);
    }

    const addToBasket = ()=>{
        // console.log(product.pk);
        fetch(`https://whatsonsale-test.herokuapp.com/api/addToBasket`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:`userId=${userId}&productId=${product.pk}`,
        })
        .then(re=>re.json())
        .then(re=>{
            if(re.data == "Product added in basket"){
                setBasketText("added");
            }else if(re.data == "Product already in basket"){
                setBasketText("already in basket");
            }
        })
    }

    const addToBasketStatus = ()=>{
        if(basketText == "add"){
            return <TouchableOpacity onPress={addToBasket}><Text style={{color:'#575757',fontWeight:'bold',marginBottom:10}}>+Add to basket</Text></TouchableOpacity>;
        }else if(basketText == "added"){
            return <TouchableOpacity onPress={addToBasket}><Text style={{color:'#1073B5',fontWeight:'bold',marginBottom:10}}>Product added to basket</Text></TouchableOpacity>;
        }else{
            return <TouchableOpacity onPress={addToBasket}><Text style={{color:'#000000',fontWeight:'bold',marginBottom:10}}>Product already in basket</Text></TouchableOpacity>;
        }
    }

    return(
        <View>
            <View style={{width:'100%',"flexDirection":'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                <FlatList
                    contentContainerStyle={{"flexDirection":'column',height:'100%'}}
                    data={products} 
                    keyExtractor={item => item.fields.pk}
                    numColumns={3} 
                    renderItem={({item,index})=>(
                        <TouchableOpacity onPress={()=>viewProduct(item)}>
                            <Image  source={{uri:item.fields.image}} style={[style.post,{width:width*0.3,height:width*0.3}]}>
                            </Image>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <Overlay isVisible={viewOverlay} onBackdropPress={()=>{setProduct(); setViewOverlay(false);setBasketText("add")}}>
                {product != undefined?
                    (
                        <View>
                            {addToBasketStatus()}
                            <Image style={[style.postImage,{width:width*0.70,height:width*0.70}]} source={{uri:product.fields.image}}/>
                            <View>
                                <Text style={{fontWeight:'bold',fontSize:18,marginTop:5}}>{product.fields.name}</Text>
                                <Text style={{fontSize:15,marginTop:5,fontWeight:'bold'}}>{displayAsCurrency(product.fields.price)}</Text>
                                {product.fields.previous_price > product.fields.price?
                                    <Text style={{textDecorationLine:'line-through',fontSize:12}}>{displayAsCurrency(product.fields.previous_price)}</Text>
                                    :
                                    null
                                }
                            </View>

                        </View>
                    ):
                    null
                }
            </Overlay>
        </View>
    )
}

export default Products
const style = StyleSheet.create({
    post:{
        marginLeft:5,
        marginTop:15,
        backgroundColor:'rgba(0, 0, 0, 0.06)',
        resizeMode:'cover',
        borderRadius:10,
        alignItems:'flex-start'
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
})