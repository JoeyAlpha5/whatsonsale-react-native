import React from 'react';
import Swiper from 'react-native-swiper';
import Button from '../../Components/Button';
import {View, Text, StatusBar,StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Feather';

const GetStarted = ({navigation})=>{
    const page = (screen) =>{
        navigation.navigate(screen);
    }
    return(
        <>
            <StatusBar  backgroundColor="white" barStyle="dark-content"/>
            <View style={style.body}>
                <View style={style.topSection}>
                    <Image style={{width:173,height:34,resizeMode:'contain',marginTop:30}} source={require('../../assets/textlogo.png')}/>
                </View>
                <View style={style.bottomSection}>
                    {/* swiper tutorial */}
                    <View style={{width:'100%',height:320,justifyContent:'center',alignItems:'center'}}>
                        <Swiper  prevButton={<></>} nextButton={<></>} width={320} height={300}  loadMinimalSize={1} autoplay={false} loadMinimal={true} showsButtons={false} dotColor={'gray'} activeDotColor={'#fff'}  style={style.wrapper} showsButtons={true}>
                            <View style={style.slide1}>
                                <Ionicons name="tag" color="#fff" size={80}/>
                                <Text style={style.text}>
                                    Welcome to WhatsOnSale.{'\n'} A virtual
                                    shopping experience{'\n'} like no other.
                                </Text>
                            </View>
                            <View style={style.slide2}>
                                <Ionicons name="search" color="#fff" size={80}/>
                                <Text style={style.text}>
                                    Find the latest promotions from{'\n'}your favourite brands and retailers
                                </Text>
                            </View>
                            <View style={style.slide3}>
                                <Ionicons name="shopping-cart" color="#fff" size={80}/>
                                <Text style={style.text}>
                                    Create and share baskets with friends.
                                </Text>
                            </View>
                        </Swiper>
                    </View>

                    <Button buttonFunction={()=>page('signIn')} bgcolor="#DA0E2F" text="Sign in" color={"white"} outline={false}/>
                    <Button buttonFunction={()=>page('register')} bgcolor="white" text="Sign up" color={"white"} outline={true}/>

                </View>
            </View>
        </>
    )
}

export default GetStarted
const style = StyleSheet.create({
    topSection:{
        alignItems:'center',
        justifyContent:'center',
        height:'30%',

    },
    body:{
        flex:1,
        backgroundColor:'white',
        flexDirection:'column',
        justifyContent:'space-between'
    },
    bottomSection:{
        width:'100%',
        height:'70%',
        backgroundColor:'#000',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        justifyContent:'center',
        alignItems:'center',
    },

    //tutorial swiper
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color:'white', 
        textAlign:'center',
        marginTop:20,
        marginBottom:10,
        lineHeight:20
    }

})