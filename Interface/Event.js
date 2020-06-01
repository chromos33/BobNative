import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { Text, View, Animated } from 'react-native';
import Appointment from '../Interface/Appointment'

export default class PeopleEvent extends Component {
    constructor(props) {
        super(props);
        this.saveHeight = this.saveHeight.bind(this);
        this.getStyles = this.getStyles.bind(this);
        this.handleAccordionOpen = this.handleAccordionOpen.bind(this);
        this.state = {
            AccordionOpenHeight: 0,
            AccordionHeight: new Animated.Value(0),
            AccordionState: "Closed",
            Inited: false,
            Appointments: null
        };
    }
    async componentDidMount() {
      var Result = await fetch("http://192.168.50.108:5001/Events/GetEventDates/"+this.props.data.id,{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            
          }
        }).then((response) => {
          return response.json();
        }).then((json) => {
          return json;
        })
        .catch((error) => {
        });
        this.setState({Appointments: Result});
    }
    getStyles(element) {
        switch (element) {
            case "container":
                let opacity = 0;
                if(this.state.Inited)
                {
                    opacity = 1;
                }
                return {
                    backgroundColor: '#272c2e',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 5,
                    alignSelf: "stretch",
                    width: "100%",
                    opacity: opacity
                };
            case "AccordionOpener":
                return {
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingLeft: 10,
                    paddingRight: 10,
                    backgroundColor: '#272c2e',
                    color: "#BAC6D1",
                    alignSelf: "stretch"
                };
            case "AccordionContent":
                return this.getAccordionStyle();
        }
    }
    getAccordionStyle() {
        if (!this.state.Inited) {
            return {
                overflow: "hidden",
                width:"100%"
            };
        }
        else {
            return {
                height: this.state.AccordionHeight,
                overflow: "hidden",
                width:"100%"
            };
        }
        
    }
    saveHeight(e) {
        if (!this.state.Inited) {
            this.setState({
                Inited: true,
                AccordionOpenHeight: e.nativeEvent.layout.height
            });
        }
    }
    handleAccordionOpen(e) {
        if (this.state.AccordionState === "Closed") {
            this.setState({AccordionState: "Open"});
            Animated.timing(this.state.AccordionHeight, {
                toValue: this.state.AccordionOpenHeight,
                duration: 100
            }).start();
        }
        else {
            this.setState({AccordionState: "Closed"});
            Animated.timing(this.state.AccordionHeight, {
                toValue: 0,
                duration: 100
            }).start();
        }
    }

    render() {
        if(this.state.Appointments != null && this.state.Appointments.Header != undefined)
        {
            var i = 0;
            const Appointments = this.state.Appointments.Header.map(function(AppointmentData){
                i++;
                return <Appointment key={i} date={AppointmentData.Date} time={AppointmentData.Time} Requests={AppointmentData.Requests}></Appointment>;
            })
            
            return (
                <View style={this.getStyles("container")}>
                    <Text onPress={this.handleAccordionOpen} style={this.getStyles("AccordionOpener")}>{this.props.data.name}</Text>
                    <Animated.View onLayout={this.saveHeight} style={this.getStyles("AccordionContent")}>
                        {Appointments}
                    </Animated.View>
                </View>
            );
        }
        else
        {
            return null;
        }
        
    }

}


