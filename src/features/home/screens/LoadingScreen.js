import React, {component} from "react";
import {View,Text,Stylesheet,ActivityIndicator} from 'react-native';
import firebase from 'firebase'
class LoadingScreen extends component{
    componentDidMount(){
        this.checkIfLoggedIn();
    }
    checkIfLoggedIn=()=>{
        firebase.auth().onAuthStateChanged(
            function(user){
            if(user){
                this.props.navigation.navigate('DashboardScreen');
            }
            else{
                this.props.navigation.navigate('LoginScreen');
            }
        }.bind(this)
        );
    }
    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator size="large" />
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