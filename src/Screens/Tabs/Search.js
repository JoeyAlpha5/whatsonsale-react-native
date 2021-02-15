import React, {useState,useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, ActivityIndicator} from 'react-native';
import PageHeader from '../../Components/Header';
import SearchFilter from '../../Components/SearchFilter';
import SearchResult from '../../Components/SearchResult';
const Search = ()=>{
    const [searchResults,setSearchResults] = useState([]);
    const [SearchInput,setSearchInput] = useState('');
    const [Loading,setLoading] = useState(false);
    const [Category,setCategory] = useState('');

    useEffect(()=>{
        // get search results when category is updated
        setLoading(true);
        getSearchResults(SearchInput);
    },[Category])

    const getSearchResults = (searchInput)=>{
        setSearchInput(searchInput);
        if(searchInput != "") {
            setLoading(true)
            fetch("https://b6d481bfe7be.ngrok.io/api/searchPage?searchInput="+searchInput+"&searchCategory="+Category)
            .then(re=>re.json())
            .then(re=>{
                setSearchResults(re.data)
                setLoading(false);
            });
        }
        else{
            setLoading(false);
            setSearchResults([]);
        } 
    }

    const applyFilter = (category)=>{
        setCategory(category);       
    }

    return(
        <View>
            <PageHeader title="Search" color="#DA0E2F"/>
            <View style={style.top}>
                <View style={style.innerTop}>
                    <Text style={style.title}>Search</Text>
                    <Text adjustsFontSizeToFit>Find your favourite brands</Text>
                    <View style={style.searchView}>
                        <TextInput onChangeText={text=>getSearchResults(text)} style={style.searchInputStyle} placeholder={"Search for brands."}/>
                        <SearchFilter filter={applyFilter}/>
                    </View>
                </View>
            </View>
            
            {Loading==false?<SearchResult data={searchResults}/>:<ActivityIndicator size="small" color="#000000" />}
            

        
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
        alignItems:'center',
        paddingBottom:20
        
    },
    searchView:{
        width:'100%',
        flexDirection:'row',
    },
    searchInputStyle:{
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