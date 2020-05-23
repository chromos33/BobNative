import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { loadAsync } from 'expo-font';

export default class App extends Component {
  constructor(props)
  {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    loadAsync({
      // Load a font `Montserrat` from a static resource
      "fa-solid-900": require('./assets/fonts/fa-solid-900.ttf')
    });
  }
  getStyles()
  {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
  }
  handleClick(e)
  {
    Alert-alert("Titel254","Test25");
  }
  render(){
    return (
      <View style={this.getStyles().container}>
        <Text onPress={this.handleClick}>Start point App.js CUCK</Text>
        <FontAwesome icon={SolidIcons.child} />
      </View>
    );
  }
  
}


