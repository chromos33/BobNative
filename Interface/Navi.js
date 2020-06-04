import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { Text, View, Animated, TouchableOpacity } from 'react-native';
import FontAwesome, { SolidIcons } from 'react-native-fontawesome';

export default class Navi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posY: new Animated.Value(-50000),
            navState: "Closed",
            naviHeight: 0
        }
        this.toggleNavi = this.toggleNavi.bind(this);
        this.getStyles = this.getStyles.bind(this);
        this.setNaviHeight = this.setNaviHeight.bind(this);
        
    }
    getStyles(element) {
        switch (element) { 
            case "Navicontainer":
                return {
                    width:"100%",
                    paddingTop:10,
                    paddingBottom:10,
                    paddingLeft:10,
                    paddingRight:10,
                    borderBottomWidth:1,
                    borderColor: "#BAC6D1",
                    zIndex:1000,
                    backgroundColor:"#272c2e"
                }
            case "icon":
                return {
                    fontSize:25,
                    color: "#BAC6D1",
                    textAlign: "right"
                }
            case "NaviLinksContainer":
                return {
                    top: this.state.posY,
                    position:"absolute",
                    zIndex:6,
                    width:"100%",
                    backgroundColor:"#485358",
                    borderBottomWidth:1,
                    borderColor: "#BAC6D1",
                }
        }
    }
    toggleNavi(e)
    {
        var _this = this;
        if(this.state.navState === "Open")
        {
            this.setState({navState: "Closed"});
            Animated.timing(this.state.posY,{
                toValue:-this.state.naviHeight,
                duration:500
              }).start();
        }
        else
        {
            this.setState({navState: "Open"});
            Animated.timing(this.state.posY,{
                toValue:50,
                duration:500
              }).start();
        }
    }
    setNaviHeight(e)
    {
        if(this.state.naviHeight === 0)
        {
            this.setState({naviHeight: e.nativeEvent.layout.height});
            Animated.timing(this.state.posY,{
                toValue:-e.nativeEvent.layout.height,
                duration:10
              }).start();
        }
        
    }
    render() {
        //console.log(this.state.posY);
        return (
            <View style={{width: "100%",height:50}}>
                <View style={{position:"absolute", top:0, left:0, width:"100%", height:60}}>
                    <TouchableOpacity onPress={this.toggleNavi} style={this.getStyles("Navicontainer")}>
                        <FontAwesome icon={SolidIcons.bars} style={this.getStyles("icon")} />
                    </TouchableOpacity>
                    <Animated.View onLayout={this.setNaviHeight} style={this.getStyles("NaviLinksContainer")}>
                        <Text>Test 1</Text>
                        <Text>Test 2</Text>
                        <Text>Test 3</Text>
                    </Animated.View>
                </View>
            </View>);
            
    }
}