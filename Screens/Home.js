import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Alert,TextInput,FlatList,Animated } from 'react-native';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { loadAsync } from 'expo-font';

export default class Home extends Component {
  constructor(props)
  {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.IconLayout = this.IconLayout.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.NavOnLayout = this.NavOnLayout.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.state = {
      Text: "Test",
      FontLoaded: false,
      posX: 0,
      startXDrag: 0,
      screenHeight: 0,
      screenWidth:0,
      NavWidth: 0,
      Mode : 0,
      Items:[
        {key: 'David'},
        {key: 'David1'},
        {key: 'David2'}
        ]
    };
  }
  handleMove(e)
  {
    console.log(e);
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
      navbar:{
        height: "100%",
        width: 40,
        position: "absolute",
        top:0,
        left: this.state.posX,
        backgroundColor: '#ff0000',
      },
      nav:{
        height: "100%",
        width: this.state.screenWidth,
        position: "absolute",
        top:0,
        left: this.state.posX - this.state.screenWidth,
        backgroundColor: '#ffff00',
      },
      icon: {
        fontSize: 60
      },
      box: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor : 'black',
        paddingTop:5,
        paddingRight:10,
        paddingBottom:5,
        paddingLeft:10,
      }
    });
  }
  async componentDidMount() {
    
    if(this.state.FontLoaded === undefined || this.state.FontLoaded === false)
    {
      await loadAsync({
        // Load a font `Montserrat` from a static resource
        "fa-solid-900": require('../assets/fonts/fa-solid-900.ttf')
      });
      this.setState({FontLoaded: true});
    }
  }
  handleDragStart(e)
  {
  }
  handleDrag(e)
  {
    if(this.state.Mode == 1)
    {
      let posX = e.nativeEvent.pageX;
      if(posX < 50)
      {
        posX = 0;
      }
      if(posX + this.state.NavWidth > this.state.screenWidth)
      {
        posX = this.state.screenWidth - this.state.NavWidth;
      }
      this.setState({
        posX: posX
      });
    }
  }
  handleTextChange(e)
  {
    this.setState({Text: e});
  }
  IconLayout(e)
  {
    this.setState({
      screenHeight: e.nativeEvent.layout.height,
      screenWidth: e.nativeEvent.layout.width
    });
  }
  NavOnLayout(e)
  {
    this.setState({
      NavWidth: e.nativeEvent.layout.width
    });
  }
  handleClick(e)
  {
      this.props.navigation.navigate('settings')
  }
  onDragStart(e)
  {
    this.setState({
      startXDrag: e.nativeEvent.pageX,
      Mode: 1
    });
  }
  onDragStop(e)
  {
    this.setState({
      Mode: 0
    });
    if(e.nativeEvent.pageX > this.state.startXDrag)
    {
      //open
    }
    else
    {
      //close
    }
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
      <View onLayout={this.IconLayout} style={this.getStyles().container}>
      <Animated.View style={this.getStyles().nav}/>
      <Animated.View onLayout={this.NavOnLayout} onTouchEnd={this.onDragStop} onTouchStart={this.onDragStart} onMoveShouldSetResponderCapture={this.handleDrag} style={this.getStyles().navbar}/>
      
        <Text onPress={this.handleClick}>Blub asdf</Text>
        <FontAwesome onTouchStart={this.handleDragStart} icon={SolidIcons.child} style={this.getStyles().icon}/>
      </View>
    );
  }
  
}


