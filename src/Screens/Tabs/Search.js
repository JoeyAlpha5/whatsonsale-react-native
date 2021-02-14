import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import PageHeader from '../../Components/Header';
import SearchFilter from '../../Components/SearchFilter';
const Search = ()=>{
    const [searchResults,setSearchResults] = useState([]);
    const getSearchResults = (searchInput)=>{
        console.log("search input ", searchInput);
        fetch("https://5fb2c1bc2020.ngrok.io/api/searchPage?searchInput="+searchInput)
        .then(re=>re.json())
        .then(re=>{
            console.log(re);
        })
    }
    return(
        <View>
            <PageHeader title="Search" color="#DA0E2F"/>
            <View style={style.top}>
                <View style={style.innerTop}>
                    <Text style={style.title}>Search</Text>
                    <Text adjustsFontSizeToFit>Find your favourite brands</Text>
                    <View style={style.searchView}>
                        <TextInput onChangeText={text=>getSearchResults(text)} style={style.searchInput} placeholder={"Search for brands."}/>
                        <SearchFilter/>
                    </View>
                </View>
            </View>
            

        </View>
    )
}

export default Search
const style = StyleSheet.create({
    title:{
        fontSize: 30,
        fontWeight:'bold'
    },
    top:{
        width:'100%',
        marginTop:20,
        alignItems:'center'
        
    },
    searchView:{
        width:'100%',
        flexDirection:'row',
    },
    searchInput:{
        height:40,
        width:'88%',
        backgroundColor:'rgba(0, 0, 0, 0.06)',
        marginTop:10,
        borderRadius:10,
        paddingLeft:5,
    },
    innerTop:{
        width:'95%'
    },

})