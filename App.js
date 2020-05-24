import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Alert,TextInput,FlatList } from 'react-native';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { loadAsync } from 'expo-font';
import Home from './Screens/Home'
import Settings from './Screens/Settings'

export default class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      FontLoaded: false
    };
  }
  async componentDidMount() {
    console.log(this.state.FontLoaded);
    
    if(this.state.FontLoaded === undefined || this.state.FontLoaded === false)
    {
      await loadAsync({
        // Load a font `Montserrat` from a static resource
        "fa-solid-900": require('./assets/fonts/fa-solid-900.ttf')
      });
      this.setState({FontLoaded: true});
    }
  }
  render(){
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" component={Home} options={{title: "BobNative"}} />
          <Stack.Screen name="settings" component={Settings} options={{title: "BobNative"}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
}


