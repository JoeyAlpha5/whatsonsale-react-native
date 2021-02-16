import React, {useState,useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, ActivityIndicator} from 'react-native';
import SearchFilter from '../../Components/SearchFilter';
import SearchResult from '../../Components/SearchResult';
import {authentication} from '../../firebase/firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Search = ({navigation,route})=>{
    const [searchResults,setSearchResults] = useState([]);
    const [SearchInput,setSearchInput] = useState('');
    const [Loading,setLoading] = useState(false);
    const [Category,setCategory] = useState('');

    useEffect(()=>{
        // get search results when category is updated
        setLoading(true);
        getSearchResults();
    },[Category])

    const getSearchResults = ()=>{
        // setSearchInput(searchInput);
        if(SearchInput != "") {
            setLoading(true);
            fetch("https://1b0eda077bf5.ngrok.io/api/searchPage?searchInput="+SearchInput+"&searchCategory="+Category+"&userId="+authentication.currentUser.uid)
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

    const viewBrand = (brand)=>{
        setSearchInput("");
        setLoading(false);
        setSearchResults([]);
        navigation.navigate('brand', {data:brand});
    }

    return(
        <View>
            {/* <PageHeader title="Search" color="#DA0E2F"/> */}
            <View style={style.top}>
                <View style={style.innerTop}>
                    <Text style={style.title}>Search</Text>
                    <Text adjustsFontSizeToFit>Find your favourite brands</Text>
                    <View style={style.searchView}>
                        <View style={style.searchSection}>
                            <TextInput onChangeText={text=>setSearchInput(text)} style={style.searchInputStyle} placeholder={"Search for brands."}/>
                            <Ionicons onPress={getSearchResults} style={style.searchIcon} name="ios-search" size={20} color="#000"/>
                        </View>
                        <SearchFilter filter={applyFilter}/>
                    </View>
                </View>
            </View>
            
            {Loading==false?<SearchResult viewBrand={(brand)=>viewBrand(brand)} data={searchResults}/>:<ActivityIndicator size="small" color="#000000" />}
            

        
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
        paddingLeft:10,
    },
    innerTop:{
        width:'95%'
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0, 0, 0, 0.06)',
        borderRadius:10,
        height:40,
        marginTop:10,

    },
    searchIcon: {
        padding: 10,
    },
})