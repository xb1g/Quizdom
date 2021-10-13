import React, {component} from "react";
import {View,Text,Stylesheet,Button} from 'react-native';
class LoginScreen extends component{
    signInWithGoogleAsync=async()=>{
        try{
            const result=await Expo.Google.logInAsync({
                //androidClientId:YOUR_CLIENT_ID_HERE,
                //iosClientId:YOUR_CLIENT_ID_HERE,
                scopes:["profile","email"]
            });
            if (result.type ==='success'){
                return result.accessToken;
            } else{
                return {cancelled:true};
            } 
        }catch (e) {
                return {error:true};
        }
    };
    render(){
        return(
            <View style={styles.container}>
                <Button title="Sign in with Google" onPress={()=>this.signInWithGoogleAsync()}/>
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