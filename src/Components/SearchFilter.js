import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Tooltip} from 'react-native-elements';
import { CheckBox, Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchFilter = (props)=>{
    const [selected,setSelected] = useState('');
    return(
        <Tooltip height={400} width={200} style={style.tooltip} backgroundColor={"#fff"} popover={
            <ScrollView>
                <View style={style.category}>
                    <CheckBox onPress={()=>setSelected('')} checkedColor={"#DA0E2F"} checked={selected == ""? true: false} checkedIcon='dot-circle-o' uncheckedIcon='circle-o'/>
                    <Text style={{color:'#000',marginLeft:0}}>All</Text>
                </View>                
                <View style={style.category}>
                    <CheckBox onPress={()=>setSelected('Clothing')} checkedColor={"#DA0E2F"} checked={selected == "Clothing"? true: false} checkedIcon='dot-circle-o' uncheckedIcon='circle-o'/>
                    <Text style={{color:'#000',marginLeft:0}}>Clothing</Text>
                </View>
                <View style={style.category}>
                    <CheckBox checkedColor={"#DA0E2F"} onPress={()=>setSelected('Home Care')} checked={selected == "Home Care"? true: false} checkedIcon='dot-circle-o' uncheckedIcon='circle-o'/>
                    <Text style={{color:'#000',marginLeft:0}}>Home Care</Text>
                </View>
                <View style={style.category}>
                    <CheckBox checkedColor={"#DA0E2F"} onPress={()=>setSelected('Electronics')} checked={selected == "Electronics"? true: false} checkedIcon='dot-circle-o' uncheckedIcon='circle-o'/>
                    <Text style={{color:'#000',marginLeft:0}}>Electronics</Text>
                </View>
                <View style={style.category}>
                    <CheckBox checkedColor={"#DA0E2F"} onPress={()=>setSelected('Restuarants')} checked={selected == "Restuarants"? true: false} checkedIcon='dot-circle-o' uncheckedIcon='circle-o'/>
                    <Text style={{color:'#000',marginLeft:0}}>Restuarants</Text>
                </View>
                <View style={style.category}>
                    <CheckBox checkedColor={"#DA0E2F"} onPress={()=>setSelected('Banks')} checked={selected == "Banks"? true: false} checkedIcon='dot-circle-o' uncheckedIcon='circle-o'/>
                    <Text style={{color:'#000',marginLeft:0}}>Banks</Text>
                </View>
                <View style={style.category}>
                    <CheckBox checkedColor={"#DA0E2F"} onPress={()=>setSelected('Entertainment')} checked={selected == "Entertainment"? true: false} checkedIcon='dot-circle-o' uncheckedIcon='circle-o'/>
                    <Text style={{color:'#000',marginLeft:0}}>Entertainment</Text>
                </View>

                <Button onPress={()=>props.filter(selected)} titleStyle={{color:'#fff'}} buttonStyle={style.button} title={"Apply filter"}/>
            </ScrollView>
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
        backgroundColor:'#000',
        width:'100%',
        marginTop:10,
    }
})