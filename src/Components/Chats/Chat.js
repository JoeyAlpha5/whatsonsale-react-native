import React, {useState,useEffect} from 'react';
import {Text,View,StyleSheet,useWindowDimensions,TextInput,Image,TouchableOpacity,ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {authentication,db} from '../../firebase/firebase';

const Chat = (props)=>{
    const height = useWindowDimensions().height;
    const [MessageInput,setMessageInput] = useState('');
    const [userOwnsBasket,setUserOwnsBasket] = useState();
    const [chatData,setChatData] = useState();
    const [messages,setMessages] = useState([]);
    const [messagesAvailable,setMessagesAvailable] = useState();
    const [userEmail,setUserEmail] = useState("");
    const aws_url = "https://whatsonsale-development.s3.amazonaws.com/";
    const firebaseMessages = db.ref(`messages/${props.chatData.shared_basket_id}`);
    // const db = firebase.firestore();


    // get chat data and messages
    useEffect(()=>{
        // console.log(props.chatData.shared_basket_id);
        setChatData(props.chatData);
        // does this user own this basket
        setUserEmail(authentication.currentUser.email);
        authentication.currentUser.email == props.chatData.owner_email? setUserOwnsBasket(true):setUserOwnsBasket(false);
        getFirebaseMessages();
    },[])


    const getFirebaseMessages = async ()=>{
        firebaseMessages.on("value",val=>{
            if(val.val() == null){
                setMessages("no messages");
            }else{
                var messages_object = val.val();
                // convert object to array
                var messages_array = Object.values(messages_object);
                setMessages(messages_array);
            }
        })
    }

    const sendMessage = ()=>{
        if(MessageInput != ''){
            var new_message = {"message":MessageInput,"user":authentication.currentUser.email};
            firebaseMessages.child(new Date().getTime()).set(new_message);
            setMessageInput('');
        }
    }

    return(
        <View style={style.container}>
            <View style={{height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                {chatData != undefined?
                    <>
                        {userOwnsBasket == true?
                            <>
                                <Text style={{marginLeft:15,fontWeight:'bold'}}>{chatData.basket_friend}</Text>
                                <Image source={{uri:aws_url+chatData.friend_profile_image}} style={{width:40, height:40, borderRadius:40,backgroundColor:'rgba(0, 0, 0, 0.06)',marginRight:15}}/>
                            </>
                            :
                            <>
                                <Text style={{marginLeft:15,fontWeight:'bold'}}>{chatData.owner}</Text>
                                <Image source={{uri:aws_url+chatData.owner_profile_image}} style={{width:40, height:40, borderRadius:40,backgroundColor:'rgba(0, 0, 0, 0.06)',marginRight:15}}/>
                            </>
                            
                        }

                    </>
                    :
                    null
                }

            </View>
            
            {/* messages section */}
            <ScrollView style={{backgroundColor:'#f5f6f0',flex:1}}>
                {messages == "no messages"?
                    <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{marginTop:20,color:'gray',fontSize:13}}>No messages</Text>
                    </View>
                    :
                    messages.map((message,index)=>{
                        // check if message belongs to the current user or not
                        return (
                            userEmail == message.user?
                                <View style={{width:'100%',justifyContent:'flex-end',alignItems:'flex-end'}} key={index}>
                                    <View style={style.myMessage}><Text style={{color:'#fff'}}>{message.message}</Text></View>
                                </View>
                                :
                                <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start'}} key={index}>
                                    <View style={style.senderMessage}><Text style={{color:'#fff'}}>{message.message}</Text></View>
                                </View>
                        )
                    })
                }
            </ScrollView>

            <View style={style.InputContainer}>
                <TextInput value={MessageInput} style={style.input} onChangeText={text=>setMessageInput(text)} placeholder={"Type message..."}/>
                <TouchableOpacity style={style.sendContainer} onPress={sendMessage}>
                    <Ionicons name="ios-send-sharp" size={25} color="#fff" style={{marginLeft:5}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Chat
const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
        flexDirection:'column',
    },
    InputContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#fff',
        height:'10%',
        borderTopColor:'#dcdcdc',
        borderTopWidth:0.5,
        alignItems:'center'
    },
    input:{
        marginLeft:15,
        width:'70%'
    },
    sendContainer:{
        width:40,
        height:40,
        backgroundColor:'#DA0E2F',
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        marginRight:15,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2.84,
        elevation: 4
    },
    myMessage:{
        backgroundColor:'#DA0E2F',
        marginRight:15,
        marginTop:10,
        padding:10,
        borderRadius:10

    },
    senderMessage:{
        backgroundColor:'#000',
        marginLeft:15,
        marginTop:10,
        padding:10,
        borderRadius:10,
    }
})