import React, {useState, useEffect} from 'react';
import {View, Text,PermissionsAndroid, Platform,StyleSheet,TouchableOpacity,Linking} from 'react-native';
import MapView,{ PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import PopUp from '../Components/PopUp';
import { Overlay } from 'react-native-elements';
const Locations = ({navigation,route})=>{
    const [myLocation,setMyLocation] = useState({latitude:0,longitude:0,latitudeDelta: 0.0922,longitudeDelta: 0.0421});
    const [brandLocations,setBrandLocations] = useState([]);
    const [selectedLocation,setSelectedLocation] = useState(null);
    const [overlay,setOverlay] = useState(false);

    useEffect(()=>{
        // check if location permission has been allowed on android
        if(Platform.OS == "android"){
            checkLocationPermission();
        }else{
            displayLocations();
        }
    },[])

    // open uber
    const openUber =()=>{
        var uber_deep_link_url = "https://m.uber.com/ul/?action=setPickup&client_id=PmGhffjdGCRg8jXukC5m-JZPTDyxsZ7N&pickup=my_location&dropoff[formatted_address]=" + selectedLocation.formatted_address + "&dropoff[latitude]=" + selectedLocation.geometry.location.lat + "&dropoff[longitude]=" + selectedLocation.geometry.location.lng + "";
        Linking.openURL(uber_deep_link_url);

    }

    const displayLocations = ()=>{
        //get user's location and display on map
        Geolocation.getCurrentPosition((position)=>{
            var coordinates = {latitude:position.coords.latitude,longitude:position.coords.longitude,latitudeDelta: 0.0922,longitudeDelta: 0.0421};
            setMyLocation(coordinates);
            fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude},${position.coords.longitude}&radius=5000&keyword=${route.params.brandName}&key=AIzaSyD7FkGPNnb-TnwiweIfGPgVGy3N3A0O6Mk`)
            .then(re=>re.json())
            .then(re=>{
                setBrandLocations(re.results);
            })
        });
    }

    // check location permission on android
    const checkLocationPermission = async ()=>{
        const granted = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
        if(!granted){
            setOverlay(true);
        }else{
            displayLocations();
        }
    }

    return(
        <>
            <MapView
                style={{flex:1}}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                region={myLocation}
                initialRegion={myLocation}
                onPress={()=>setSelectedLocation(null)}
            >


                {
                
                    brandLocations.map((location,index)=>{
                        return(
                            <Marker
                                key={index}
                                coordinate={{ latitude : location.geometry.location.lat , longitude : location.geometry.location.lng }}
                                title={location.name}
                                description={location.vicinity}
                                onPress={()=>setSelectedLocation(location)}
                            />
                        )
                    })

                }




            </MapView>
            <Overlay isVisible={overlay}>
                <PopUp successBtn={()=>setOverlay("false")} errorBtn={()=>setOverlay(false)} text={"WhatsOnSale requires location permission."} error={true} />
            </Overlay>
            {selectedLocation != null?

                <View style={style.uberTab}>
                    <Text style={{color:'#fff',marginLeft:10}}>Get there with Uber</Text>
                    <TouchableOpacity onPress={openUber}>
                        <Text style={{color:'#000',backgroundColor:'#fff',padding:5,borderRadius:5,marginRight:10}}>Open Uber</Text>
                    </TouchableOpacity>
                </View>
                :
                null
            }

        </>
    )
}

export default Locations
const style = StyleSheet.create({
    uberTab:{
        width:'100%',
        height:50,
        backgroundColor:'#000000',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'

        
    }
})