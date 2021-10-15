import {createAppContainer,createSwitchNavigator} from 'react-native';
import LoginScreen from '../../features/home/screens/LoginScreen';
import LoadingScreen from '../../features/home/screens/LoadingScreen';
import DashboardScreen from '../../features/home/screens/DashboardScreen';
import React from 'react';
import { StyleSheet,Text,View } from 'react-native';
import { Component } from 'react';
import * as firebase from 'firebase'
import { firebaseConfig } from '../App';
firebase.initializeApp(firebaseConfig)
const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen:LoadingScreen,
    LoginScreen:LoginScreen,
    DashboardScreen:DashboardScreen
})
export default class App extends React.Component{
    render(){
        return(
            <AppNavigator/>
        );
    }
}
const AppNavigator=createAppContainer(AppSwitchNavigator)
const styles=Stylesheet.create({
    container:{
        flex:1,
        alignItem:'center',
        justifyContent: 'center'
    }
})