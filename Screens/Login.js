import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity  } from 'react-native';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import PouchDB from 'pouchdb-core';
import { loadAsync } from 'expo-font';

export default class Login extends Component {
  constructor(props) {
    super(props);
    PouchDB.plugin(require('pouchdb-adapter-asyncstorage').default);
    const db = PouchDB("BobNative", { adapter: 'asyncstorage' });
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.saveLogin = this.saveLogin.bind(this);
    this.LoadLoginData = this.LoadLoginData.bind(this);
    this.state = {
      Login: "",
      Password: "",
      Error :"",
      db: db
    }
  }
  handleLoginChange(e)
  {
    this.setState({
      Login: e
    });
  }
  handlePassChange(e)
  {
    this.setState({
      Password: e
    });
  }
  componentDidMount()
  {
    this.LoadLoginData();
  }
  LoadLoginData()
  {
    var _this = this;
    this.state.db.get("Login").then(function(doc){
      _this.setState({
        Login: doc.Login,
        Password: doc.Password
      });
      return true;
    }).catch(function (err){
      if(err.name === "not_found")
      {
        return false;
      }
      throw err;
    });
  }
  async saveLogin()
  {
    var _this = this;
    var docExists = await this.state.db.get("Login").then(function(doc){
      if(doc.Login != _this.state.Login || doc.Password != _this.state.Password)
      {
        return doc._rev;
      }
      return false;
    }).then(function(rev){
      if(rev !== false)
      {
        _this.state.db.put({_id: "Login","Login": _this.state.Login,"Password":_this.state.Password,_rev: rev});
      }
      return true;
    }).catch(function (err){
      if(err.name === "not_found")
      {
        return false;
      }
      throw err;
    });
    if(!docExists)
    {
      var doc = {
        "_id": "Login",
        "Login": _this.state.Login,
        "Password": _this.state.Login
      }
      this.state.db.put(doc);
    }
  }
  async handleLogin(e)
  {
    if(this.state.Login !== "" && this.state.Password != "")
    {
      var loginResult = await fetch("http://192.168.50.108:5001/Main/LoginMobile",{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({
          user: this.state.Login,
          pass: this.state.Password
        })
      }).then((response) => {
        return response.json();
      }).then((json) => {
        return JSON.parse(json).Response;
      })
      .catch((error) => {
      });
      if(loginResult === "true")
      {
        this.saveLogin();
        this.props.navigation.navigate('peoplevents')
      }
      else
      {
        this.setState({Error: "Login fehlgeschlagen"});
      }
    }
    else{
      this.setState({
        Error: "Bitte Login/Passwort ausfüllen"
      });
    }
  }
  getStyles(element) {
    switch (element) {
      case "container":
        return {
          flex: 1,
          backgroundColor: '#485358',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 25,
        };
      case "textinput":
        return {
          borderWidth: 1,
          borderColor: "#ced4da",
          padding: 5,
          fontSize: 30,
          color: "#BAC6D1",
          marginBottom: 20,
          minWidth: 300,
          textAlign: 'center',
        }
      case "buttoncontainer":
        return{
        };
      case "Error":
        return {
          color:"#ff0000",
          fontWeight:'bold',
          fontSize:24,
          marginBottom:20,
          textAlign:"left"

        };
      case "button":
        return {
          borderWidth: 1,
          borderColor: "#000",
          color:"#fff",
          backgroundColor:"#000",
          padding: 5,
          fontSize: 30,
          marginBottom: 20,
          minWidth: 300,
          textAlign: 'center'
        }
    }
  }
  render() {
    return (
      <View style={this.getStyles("container")}>
        <Image style={{marginBottom:40}} source={require('../assets/BobDeathmicLogo.png')}/>
        <TextInput value={this.state.Login} style={this.getStyles("textinput")} placeholder={"Login"} onChangeText={this.handleLoginChange} />
        <TextInput value={this.state.Password} style={this.getStyles("textinput")} placeholder={"Password"} onChangeText={this.handlePassChange} secureTextEntry={true} />
        {this.state.Error !== "" && 
          <Text style={this.getStyles("Error")}>{this.state.Error}</Text>
        }
        <TouchableOpacity  onPress={this.handleLogin} style={this.getStyles("buttoncontainer")}>
          <Text style={this.getStyles("button")}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

}


