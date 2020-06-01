import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Alert,TextInput,FlatList,Animated, Dimensions } from 'react-native';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import PouchDB from 'pouchdb-core';
import { loadAsync } from 'expo-font';

export default class Home extends Component {
  constructor(props)
  {
    super(props);
    PouchDB.plugin(require('pouchdb-adapter-asyncstorage').default);
    const db = PouchDB("BobNative",{adapter: 'asyncstorage'});
    //Insert document
    /*
    var doc = {
      "_id": "test",
      "name": "test",
      "login": "chromos33",
      "pass": "kermit22"
    };
    db.put(doc);
    */
    //Update Document
    db.get("test").then(function(doc){
      return doc._rev;
    }).then(function(rev){
      //try to put doc from previous get function and update there and put changed...
      db.put({_id: "test", login: "chromos66",_rev: rev})
      return undefined;
    }).then(function(test){
      db.get("test").then(function(doc){
        console.log(doc);
      });
    }).catch(function(err){
      console.log(err);
    });


    //Get Document
   /*
    db.get("test").then(function(doc){
      console.log(doc);
    });*/
    
    this.handleClick = this.handleClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.IconLayout = this.IconLayout.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.NavOnLayout = this.NavOnLayout.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.handleAnimation = this.handleAnimation.bind(this);
    const windowWidth = Dimensions.get('window').width;
    this.state = {
      Text: "Test",
      FontLoaded: false,
      posX: new Animated.Value(0),
      posX2: new Animated.Value(-windowWidth),
      startXDrag: 0,
      screenWidth:windowWidth,
      NavWidth: 0,
      Mode : 0,
      NavOpen: false,
      Items:[
        {key: 'David'},
        {key: 'David1'},
        {key: 'David2'}
        ]
    };
  }
  handleAnimation(e)
  {
    if(this.state.NavOpen == true)
    {
      this.setState({
        NavOpen: false
      });
      Animated.timing(this.state.posX,{
        toValue:this.state.screenWidth - 40,
        duration:500
      }).start();
      Animated.timing(this.state.posX2,{
        toValue:0,
        duration:500
      }).start();
    }
    else{
      this.setState({
        NavOpen: true
      });
      Animated.timing(this.state.posX,{
        toValue:0,
        duration:500
      }).start();
      Animated.timing(this.state.posX2,{
        toValue:-this.state.screenWidth,
        duration:500
      }).start();
    }
    
  }
  handleMove(e)
  {
    console.log(e);
  }
  getStyles(element)
  {
    switch(element)
    {
      case "container":
        return {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:25,
          };
      case "navbar":
        return {
          height: "100%",
          width: 40,
          position: "absolute",
          top:0,
          left: this.state.posX,
          backgroundColor: '#ff0000',
          zIndex:2
          };
      case "nav":
        return {
          height: "100%",
          width: this.state.screenWidth,
          position: "absolute",
          top:0,
          left: this.state.posX2,
          backgroundColor: '#ffff00',
          zIndex:2
          };
      case "icon":
        return {
          fontSize: 60
          };
    }
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
    /*
    this.setState({
      startXDrag: e.nativeEvent.pageX,
      Mode: 1
    });
    */
  }
  onDragStop(e)
  {
    /*
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
    */
  }
  render(){
    if(this.state.FontLoaded === false)
    {
      return (
        <View style={this.getStyles("container")}>
          <Text>Loading</Text>
        </View>
      );
    }
    return (
      <View onLayout={this.IconLayout} style={this.getStyles("container")}>
      <Animated.View style={this.getStyles("nav")}/>
      <Animated.View onLayout={this.NavOnLayout} onTouchEnd={this.onDragStop} onPress={this.handleAnimation} onTouchStart={this.handleAnimation} onMoveShouldSetResponderCapture={this.handleDrag} style={this.getStyles("navbar")}/>
      
        <Text onPress={this.handleClick}>Blub asdf</Text>
        <FontAwesome onTouchStart={this.handleDragStart} icon={SolidIcons.child} style={this.getStyles("icon")}/>
      </View>
    );
  }
  
}


