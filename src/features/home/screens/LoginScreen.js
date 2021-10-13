import React, {component} from "react";
import {View,Text,Stylesheet} from 'react-native';
class LoginScreen extends component{
    render(){
        return(
            <View style={styles.container}>
                <Text>Login Screen</Text>
            </View>
        );
    }
}
export default LoginScreen;
const styles=Stylesheet.create({
    container:{
        flex:1,
        alignItem:'center',
        justifyContent: 'center'
    }
})