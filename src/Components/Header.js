import React from 'react';
import {Header} from 'react-native-elements';
const PageHeader = (props)=>{
    return(
        <Header
            centerComponent={{ text: props.title, style: { color:"#000" } }}
            containerStyle={{
                backgroundColor: props.color ,
            }}
        />
    )
}
export default PageHeader;