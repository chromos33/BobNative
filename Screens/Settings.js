import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Alert,TextInput,FlatList } from 'react-native';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { loadAsync } from 'expo-font';

export default class Settings extends Component {
  constructor(props)
  {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = {
      Text: "Test",
      FontLoaded: false,
      Items:[
        {key: 'David'},
        {key: 'David1'},
        {key: 'David2'}
        ]
    };
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
  getTextInputStyle()
  {
    return StyleSheet.create({
      box: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor : 'black',
        paddingTop:5,
        paddingRight:10,
        paddingBottom:5,
        paddingLeft:10,
      },
    });
  }
  async componentDidMount() {
    console.log(this.state.FontLoaded);
    
    if(this.state.FontLoaded === undefined || this.state.FontLoaded === false)
    {
      await loadAsync({
        // Load a font `Montserrat` from a static resource
        "fa-solid-900": require('../assets/fonts/fa-solid-900.ttf')
      });
      this.setState({FontLoaded: true});
    }
  }
  handleTextChange(e)
  {
    this.setState({Text: e});
  }
  handleClick(e)
  {
    Alert-alert("Titel254","Test25");
  }
  render(){
    if(this.state.FontLoaded === false)
    {
      return (
        <View style={this.getStyles().container}>
          <Text>Loading</Text>
        </View>
      );
    }
    return (
      <View style={this.getStyles().container}>
        <Text>Settings 1</Text>
      </View>
    );
  }
  
}


