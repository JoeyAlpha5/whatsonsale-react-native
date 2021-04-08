import React, {useState,useEffect,createRef} from 'react';
import {Text,View,ActivityIndicator, ScrollView,StyleSheet,TouchableOpacity,useWindowDimensions} from 'react-native';
import {authentication} from '../../firebase/firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon,Overlay } from 'react-native-elements';
import PopUp from '../../Components/PopUp';
import ActionSheet from "react-native-actions-sheet";
import Chat from './Chat';

const ChatList = (props)=>{
    const [sharedBaskets,setSharedBaskets] =useState([]);
    const [fetchComplete,setFetchComplete] = useState(false);
    const [overlay,setOverlay] = useState(false);
    const [selectedBasketedToDelete,setSelectedBasketedToDelete] = useState();
    const [chatData,setChatData] =  useState();
    const actionSheetRef = createRef();
    const height = useWindowDimensions().height;
    

    useEffect(()=>{
        fetch(`https://whatsonsale-test.herokuapp.com/api/getSharedBaskets?userId=${authentication.currentUser.uid}`)
        .then(re=>re.json())
        .then(re=>{
            setSharedBaskets(re.data);
            setFetchComplete(true);
        })
    },[fetchComplete])

    const deleteBasket = (basket_id)=>{
        setSelectedBasketedToDelete(basket_id);
        setOverlay(true);
    }

    const confirmDeletion = ()=>{
        fetch(`https://whatsonsale-test.herokuapp.com/api/deleteSharedBasket?shared_basket_id=${selectedBasketedToDelete}`)
        .then(re=>re.json())
        .then(re=>{
            setFetchComplete(false);
            setOverlay(false);
        })
    }

    const viewChat = (index)=>{
        actionSheetRef.current?.setModalVisible();
        setChatData(sharedBaskets[index]);
    }
    
    return(
        <ScrollView style={{width:'95%'}}>
            {fetchComplete == false?
                <ActivityIndicator size="small" color="#000000" />
                :
                sharedBaskets.map((item,index)=>{
                    return(
                        <View style={style.tabs} key={index}>
                            <View style={style.post}>
                                <View>
                                    <Text style={{fontWeight:'bold',marginLeft:15}}>{item.owner}'s basket</Text>
                                    <Text style={{marginLeft:15,fontSize:12,color:'#575757'}}>shared with {item.basket_friend}</Text>
                                    <View style={{flexDirection:'row',marginLeft:15,marginTop:5}}>
                                        <TouchableOpacity onPress={()=>props.viewBasket(item.owner_user_id,item.owner)}><Text style={{fontSize:12,fontWeight:'bold',textDecorationLine:'underline'}}>View basket</Text></TouchableOpacity>
                                        <TouchableOpacity onPress={()=>viewChat(index)}><Text style={{fontSize:12,marginLeft:15,fontWeight:'bold',color:'#DA0E2F',textDecorationLine:'underline'}}>Messages</Text></TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={()=>deleteBasket(item.shared_basket_id)}>
                                    <Ionicons name="ios-trash-outline" size={20} style={{marginRight:15}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })
            }
            <Overlay isVisible={overlay} onBackdropPress={()=>setOverlay(false)}>
                <PopUp errorBtn={()=>confirmDeletion()} text={"Comfirm deletion"} error={true} />
            </Overlay>
            <ActionSheet gestureEnabled={true} ref={actionSheetRef} containerStyle={{borderTopRightRadius:30,borderTopLeftRadius:30,backgroundColor:'#fff'}}>
                <View style={style.actionSheet,{height:height*0.9}}>
                    <Chat chatData={chatData}/>
                </View>
            </ActionSheet>
        </ScrollView>
    )
}
export default ChatList
const style = StyleSheet.create({
    actionSheet:{
        backgroundColor:'#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        justifyContent:'center',
        alignItems:'center'
    },
    tabs:{
        alignItems:'center',
        width:'100%',
        marginTop:10,
        marginBottom:10,
        flexDirection:'row'
    },
    post:{
        width:'100%',
        height:100,
        backgroundColor:'white',
        borderRadius:10,
        shadowColor: "#000",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        shadowOffset: {
            // width: 0,
            // height: 1,
        },
        shadowOpacity: 0.25,
        // shadowRadius: 2.84,
        // elevation: 1
    },
})