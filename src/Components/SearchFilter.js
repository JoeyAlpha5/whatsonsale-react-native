import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Tooltip} from 'react-native-elements';
import { CheckBox, Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchFilter = ()=>{
    const [selected,setSelected] = useState('');
    return(
        <Tooltip height={400} width={200} style={style.tooltip} backgroundColor={"#000"} popover={
            <>
                <View style={style.category}>
                    <CheckBox onPress={()=>setSelected('clothing')} checkedColor={"#DA0E2F"} checked={selected == "clothing"? true: false} checkedIcon='dot-circle-o' uncheckedIcon='circle-o'/>
                    <Text style={{color:'#fff',marginLeft:0}}>Clothing</Text>
                </View>
                <View style={style.category}>
                    <CheckBox checkedColor={"#DA0E2F"} onPress={()=>setSelected('homecare')} checked={selected == "homecare"? true: false} checkedIcon='dot-circle-o' uncheckedIcon='circle-o'/>
                    <Text style={{color:'#fff',marginLeft:0}}>Home Care</Text>
                </View>
                <View style={style.category}>
                    <CheckBox checkedColor={"#DA0E2F"} onPress={()=>setSelected('electronics')} checked={selected == "electronics"? true: false} checkedIcon='dot-circle-o' uncheckedIcon='circle-o'/>
                    <Text style={{color:'#fff',marginLeft:0}}>Electronics</Text>
                </View>
                <View style={style.category}>
                    <CheckBox checkedColor={"#DA0E2F"} onPress={()=>setSelected('restuarants')} checked={selected == "restuarants"? true: false} checkedIcon='dot-circle-o' uncheckedIcon='circle-o'/>
                    <Text style={{color:'#fff',marginLeft:0}}>Restuarants</Text>
                </View>
                <View style={style.category}>
                    <CheckBox checkedColor={"#DA0E2F"} onPress={()=>setSelected('banks')} checked={selected == "banks"? true: false} checkedIcon='dot-circle-o' uncheckedIcon='circle-o'/>
                    <Text style={{color:'#fff',marginLeft:0}}>Banks</Text>
                </View>
                <View style={style.category}>
                    <CheckBox checkedColor={"#DA0E2F"} onPress={()=>setSelected('entertainment')} checked={selected == "entertainment"? true: false} checkedIcon='dot-circle-o' uncheckedIcon='circle-o'/>
                    <Text style={{color:'#fff',marginLeft:0}}>Entertainment</Text>
                </View>

                <Button titleStyle={{color:'#000'}} buttonStyle={style.button} title={"Apply filter"}/>
            </>
        }>
            <View style={style.filter}>
                <Ionicons name="md-options-outline" color="#575757" size={25}/>
            </View>
        </Tooltip>
    )
}
export default SearchFilter

const style = StyleSheet.create({
    category:{
        flexDirection:'row',
        alignItems:"center",
        width:'100%'
    },
    filter:{
        height:40,
        backgroundColor:'rgba(0, 0, 0, 0.06)',
        marginLeft:5,
        marginTop:10,
        width:40,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'

    },
    button:{
        backgroundColor:'#fff',
        color:'#000',
        width:'100%',
        marginTop:10,
    }
})