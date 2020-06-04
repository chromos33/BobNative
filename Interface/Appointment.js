import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { Text, View, TouchableOpacity } from 'react-native';
import FontAwesome, { SolidIcons } from 'react-native-fontawesome';

import PouchDB from 'pouchdb-core';
import { loadAsync } from 'expo-font';

export default class Appointment extends Component {
    constructor(props) {
        super(props);
        this.changeToUnvoted = this.changeToUnvoted.bind(this);
        this.changeToYes = this.changeToYes.bind(this);
        this.changeToNo = this.changeToNo.bind(this);
        this.changeToMaybe = this.changeToMaybe.bind(this);
        this.syncToServer = this.syncToServer.bind(this);
        this.state = {
            ownAppointmentRequest: undefined
        }
    }
    async componentDidMount() {
        var _this = this;
        this.props.Requests.map(function (request) {

            if (request.canEdit) {
                if (_this.state.ownAppointmentRequest === undefined) {
                    _this.setState({ ownAppointmentRequest: request });
                }
            }
        });
    }
    getStyles(element) {
        switch (element) {
            case "container":
                return {
                    backgroundColor: '#65717C',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: "stretch",
                    width: "100%",
                    borderBottomColor: "#ff0000",
                    borderBottomWidth: 2,
                    paddingTop: 5,
                    paddingBottom: 5
                };
            case "text":
                return {
                    fontSize: 20,
                    color: "#BAC6D1",
                    textAlign: 'center',
                    fontWeight: "bold",
                    marginBottom:10
                }
            case "icon":
                return {
                    fontSize: 60,
                    color: "#BAC6D1",
                    textAlign: "center"
                };
            case "votecontainer":
                return {
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    width: "100%",
                }
        }
    }
    getVoteStyle(voteOption, voteValue) {
        switch (voteOption) {
            case 0:
                if (voteOption == voteValue) {
                    return {
                        backgroundColor: "rgba(39,44,46,1)",
                        width: "25%"
                    };
                }
                else {
                    return {
                        backgroundColor: "rgb(39,44,46,0.2)",
                        width: "25%"
                    };
                }
            case 1:
                if (voteOption == voteValue) {
                    return {
                        backgroundColor: "rgba(0, 230, 64, 1)",
                        width: "25%"
                    };
                }
                else {
                    return {
                        backgroundColor: "rgba(0, 230, 64, 0.2)",
                        width: "25%"
                    };
                }
            case 2:
                if (voteOption == voteValue) {
                    return {
                        backgroundColor: "rgba(255, 0, 0, 1)",
                        width: "25%"
                    };
                }
                else {
                    return {
                        backgroundColor: "rgba(255, 0, 0, 0.2)",
                        width: "25%"
                    };
                }
            case 3:
                if (voteOption == voteValue) {
                    return {
                        backgroundColor: "rgba(255, 255, 0, 1)",
                        width: "25%"
                    };
                }
                else {
                    return {
                        backgroundColor: "rgba(255, 255, 0, 0.2)",
                        width: "25%"
                    };
                }

        }
    }
    changeToUnvoted(e) {
        let tmp = this.state.ownAppointmentRequest;
        if (this.state.ownAppointmentRequest.State !== 0) {
            tmp.State = 0;
            this.setState(tmp);
            this.syncToServer();
        }
    }
    changeToYes(e) {
        let tmp = this.state.ownAppointmentRequest;
        if (this.state.ownAppointmentRequest.State !== 1) {
            tmp.State = 1;
            this.setState(tmp);
            this.syncToServer();
        }

    }
    changeToNo(e) {
        let tmp = this.state.ownAppointmentRequest;
        if (this.state.ownAppointmentRequest.State !== 2) {
            tmp.State = 2;
            this.setState(tmp);
            this.syncToServer();
        }
    }
    changeToMaybe(e) {
        let tmp = this.state.ownAppointmentRequest;
        if (this.state.ownAppointmentRequest.State !== 3) {
            tmp.State = 3;
            this.setState(tmp);
            this.syncToServer();
        }
    }
    async syncToServer() {
        var getParameters = "";
        var comment = this.state.ownAppointmentRequest.Comment;
        if(comment == null)
        {
            comment = "";
        }
        getParameters += "?requestID="+this.state.ownAppointmentRequest.AppointmentRequestID;
        getParameters += "&state="+this.state.ownAppointmentRequest.States[this.state.ownAppointmentRequest.State];
        getParameters += "&comment="+comment;
        var Result = await fetch("https://bob.sauercloud.net/Events/UpdateRequestState"+ getParameters,{
          method: 'GET',
          headers: {
             Accept: "application/x-www-form-urlencoded",
            'Content-Type': 'application/json',
            
          }
        }).then((response) => {
          return response.text();
        }).then((text) => {
          return text;
        })
        .catch((error) => {
        });
    }
    render() {
        var _this = this;
        const VoteView = this.props.Requests.map(function (request) {

            if (request.canEdit) {
                return <View key={1} style={_this.getStyles("votecontainer")}>
                    <TouchableOpacity key={0} onPress={_this.changeToUnvoted} style={_this.getVoteStyle(0, request.State)}>
                        <FontAwesome icon={SolidIcons.minus} style={_this.getStyles("icon")} />
                    </TouchableOpacity>
                    <TouchableOpacity key={1} onPress={_this.changeToYes} style={_this.getVoteStyle(1, request.State)}>
                        <FontAwesome icon={SolidIcons.check} style={_this.getStyles("icon")} />
                    </TouchableOpacity>
                    <TouchableOpacity key={2} onPress={_this.changeToNo} style={_this.getVoteStyle(2, request.State)}>
                        <FontAwesome icon={SolidIcons.times} style={_this.getStyles("icon")} />
                    </TouchableOpacity>
                    <TouchableOpacity key={3} onPress={_this.changeToMaybe} style={_this.getVoteStyle(3, request.State)}>
                        <FontAwesome icon={SolidIcons.question} style={_this.getStyles("icon")} />
                    </TouchableOpacity>
                </View>
            }
            return null;
        });
        return (
            <View style={this.getStyles("container")}>
                <Text style={this.getStyles("text")}>{this.props.date}   {this.props.time}</Text>
                {VoteView}
            </View>
        );

    }

}


