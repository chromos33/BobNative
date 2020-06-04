import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { Text, View, FlatList,Animated,SafeAreaView} from 'react-native';
import PeopleEvent from '../Interface/Event'
import { ScrollView } from 'react-native-gesture-handler';
import Navi from '../Interface/Navi';

export default class PeopleEvents extends Component {
  constructor(props)
  {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.state = {
      "Events": null
    }
  }
  async componentDidMount()
  {
    var Result = await fetch("https://bob.sauercloud.net/Events/OverViewData",{
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
      case "safetybar":
        return {
          height:25,
          width:"100%",
          backgroundColor:"#ffffff",
          zIndex:100
        }
      case "Navi":
        return{
          zIndex:0,
          width: "100%"
        }
    }
  }
  refresh(e)
  {

  }
  render(){
    if(this.state.Events != null)
    {
      return (
        <SafeAreaView style={this.getStyles("container")}>
          <View style={this.getStyles("safetybar")}/>
          <Navi style={this.getStyles("Navi")}/>
            <FlatList onRefresh={this.refresh} refreshing={false}
              data={this.state.Events}
              renderItem={({ item }) => <PeopleEvent data={item}/>}
            /> 
        </SafeAreaView>
        
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


