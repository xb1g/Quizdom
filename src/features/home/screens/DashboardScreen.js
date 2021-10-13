import React, {component} from "react";
import {View,Text,Stylesheet} from 'react-native';
class DashboardScreen extends component{
    render(){
        return(
            <View style={styles.container}>
                <Text>Dashboard Screen</Text>
            </View>
        );
    }
}
export default DashboardScreen;
const styles=Stylesheet.create({
    container:{
        flex:1,
        alignItem:'center',
        justifyContent: 'center'
    }
})