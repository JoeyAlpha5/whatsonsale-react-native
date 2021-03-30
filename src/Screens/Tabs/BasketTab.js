import React, {useEffect,useState,useCallback} from 'react';
import { useFocusEffect} from '@react-navigation/native';
import {View, Text,ActivityIndicator,Platform,useWindowDimensions,StyleSheet,Image,FlatList,TouchableOpacity,ScrollView} from 'react-native';
import {authentication} from '../../firebase/firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PermissionsAndroid } from 'react-native';
import { selectContact } from 'react-native-select-contact';

const BasketTab = ()=>{
    const width = useWindowDimensions().width;
    const [products,setProducts] = useState([]);
    const [basketExists,setBasketExists] = useState(false);
    const [preview,setPreview] = useState(1);
    const [selectedContact,setSelectedContact] = useState();
    const [contacts,setContacts] = useState();
    const [shareMessage, setShareMessage] = useState("");
    let localization = {style:'currency', currency: 'ZAR'};
    let displayAsCurrency = (value) => new Intl.NumberFormat('en-ZA', localization).format(value);
    const aws_url = "https://whatsonsale-development.s3.amazonaws.com/";
    useFocusEffect(
        useCallback(() => {
            getBasket();
          }, [])
    )

    const fetchContacts = (mobileNum)=>{
        fetch(`https://whatsonsale-test.herokuapp.com/api/getUserByNumber?user_number=${mobileNum}`)
        .then((re)=>re.json())
        .then((re)=>{
            var data = re.data;
            if(data.length == 0){
                setContacts("none");
            }else{
                setContacts(data);
            }
        })
    }

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

    const shareBasketWithFriend = (friendId)=>{
        console.log(friendId);
        fetch(`https://whatsonsale-test.herokuapp.com/api/shareBasket`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:`userId=${authentication.currentUser.uid}&friendId=${friendId}`
        })
        .then(re=>re.json())
        .then(re=>{
            setShareMessage(re.response);
        })
    }

    const getContactsPermission = async ()=>{
        if(Platform.OS == "android"){
            const granted = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
            if(granted){
                shareBasket();
            }

        }else{
            shareBasket();
        }
    }


    const displayContacts = ()=>{
        contacts.map(item=>{
            console.log(item);
            return(
                <Text>Hello</Text>
            )
        })

    }

    const shareBasket = ()=>{
        selectContact()
        .then(selection=>{
            if(selection){
                var mobile_number = selection.phones[0].number;
                var contactNumArray = mobile_number.split(" ");
                var mobileNum = "";

                //check if there's count code
                var firstThreeDigits = contactNumArray[0].substring(0, 3);
                var firsDigit = contactNumArray[0].substring(0, 1);
                if (firstThreeDigits == "+27") {
                    contactNumArray[0] = "" + contactNumArray[0].substring(3);
                }

                if (firsDigit == "0") {
                    contactNumArray[0] = "" + contactNumArray[0].substring(1);
                }

                for (var i = 0; i < contactNumArray.length; i++) {
                    mobileNum = mobileNum + contactNumArray[i];
                }
                setSelectedContact(mobileNum);
                fetchContacts(mobileNum);

            }
        })
    }

    return(
        <ScrollView style={{flex:1}}>
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
                            
                {products.length == 0?null:<TouchableOpacity style={style.share} onPress={getContactsPermission}><Ionicons style={{marginLeft:5}} name="share-social-outline" size={22} color="#575757"/><Text style={{marginLeft:5}}>Share basket</Text></TouchableOpacity>}

                <View style={{marginTop:10}}>
                    { selectedContact == undefined? 
                        null
                        :
                        <View style={{width:width,justifyContent:'center',alignItems:'center'}}>
                            <View style={style.number}>
                                <Text>0{selectedContact}</Text>
                                <TouchableOpacity onPress={()=>{setSelectedContact(null); setContacts(null);setShareMessage("")}}><Text style={style.clear}>Clear</Text></TouchableOpacity>
                            </View>

                            {contacts == undefined?
                                <ActivityIndicator style={{marginTop:20}} size="large" color="#000000" /> 
                                :   
                                contacts == "none"?<View style={{justifyContent:'center',alignItems:'center'}}><Text style={{marginTop:10,width:'100%'}}>No users found.</Text></View>
                                :
                                contacts.map(item=>{
                                    return(
                                        <>
                                            <View style={style.contactToShareWith}>
                                                <View style={{flexDirection:'row',alignItems:'center',marginTop:30}}>
                                                    <Image source={{uri: aws_url+item.profile_image}} style={style.image}/>
                                                    <View style={{marginLeft:15}}>
                                                        <Text style={{fontWeight:'bold'}}>{item.name}</Text>
                                                        <Text style={{fontSize:12,color:'#575757'}}>0{item.mobile_number}</Text>
                                                    </View>
                                                </View>
                                                <TouchableOpacity onPress={()=>shareBasketWithFriend(item.user_id)} style={{width:'100%',height:30,backgroundColor:'#DA0E2F',alignItems:'center',borderBottomRightRadius:10,borderBottomLeftRadius:10,justifyContent:'center'}}>
                                                    <Text style={{color:'#fff',fontWeight:'bold'}}>Share</Text>
                                                </TouchableOpacity>
                                            </View>
                                            {shareMessage != ""?
                                                shareMessage == "Basket already shared."?<Text style={{color:'#000',fontWeight:'bold',marginTop:20}}>{shareMessage}</Text>:<Text style={{color:'#4caf50',fontWeight:'bold',marginTop:20}}>{shareMessage}</Text>
                                                :
                                                null
                                            }
                                        </>
                                        
                                    )
                                })
                            }    

                        </View>
                    }
                </View>
            </View>
        </ScrollView>
    )
}

export default BasketTab
const style = StyleSheet.create({
    contactToShareWith:{
        width:'95%',
        height:130,
        backgroundColor:'#fff',
        marginTop:10,
        borderRadius:10,
        justifyContent:'space-between'
    },
    contact:{
        width:'80%',
        height:50,
        backgroundColor:'white',
    },
    clear:{
        marginLeft:5,
        color:'grey',
        fontWeight:'bold'
    },
    number:{
        flexDirection:'row',
        marginTop:10
    },
    share:{
        marginTop:20,
        backgroundColor:'#fff',
        padding:10,
        borderRadius:5,
        justifyContent:'space-between',
        flexDirection:'row',

    },
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