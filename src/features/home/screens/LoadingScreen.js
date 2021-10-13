import React, {component} from "react";
import {View,Text,Stylesheet,ActivityIndicator} from 'react-native';
class LoadingScreen extends component{
    render(){
        return(
            <View style={styles.container}>
                <Text>Loading Screen</Text>
            </View>
        );
    }
}
export default LoadingScreen;
const styles=Stylesheet.create({
    container:{
        flex:1,
        alignItem:'center',
        justifyContent: 'center'
    }
})