import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { Text, View, FlatList,Animated} from 'react-native';
import PeopleEvent from '../Interface/Event'

export default class PeopleEvents extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      "Events": null
    }
  }
  async componentDidMount()
  {
    var Result = await fetch("http://192.168.50.108:5001/Events/OverViewData",{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          
        }
      }).then((response) => {
        return response.json();
      }).then((json) => {
        return json.calendars;
      })
      .catch((error) => {
      });
      this.setState({Events: Result});
  }
  getStyles(element)
  {
    switch(element)
    {
      case "container":
        return {
            flex: 1,
            backgroundColor: '#485358',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop:25,
            alignItems: "flex-start",
            flexDirection: "column",
            flexWrap: "wrap",
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
 
  render(){
    if(this.state.Events != null)
    {
      return (
        <View style={this.getStyles("container")}>
          <FlatList
            data={this.state.Events}
            renderItem={({ item }) => <PeopleEvent data={item}/>}
          /> 
        </View>
      );
    }
    else
    {
      return (
        <View style={this.getStyles("container")}>
          <Text>Loading Events test</Text>
        </View>
      );
    }
      
  }
  
}


