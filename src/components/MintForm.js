import React, { Component } from "react";
import Axios from "axios";



export default class MintForm extends Component {
	constructor(props) {
        super(props);
        this.state = {
            "TokenID": null,
            "MetaverseID": null,
            "RoomID": null,
            "EventID": null,
            "SessionID": null,
            "Name": null,
            "Description": null,
            "URL": null,
            "StartTimestamp": null,
            "EndTimestamp": null,
            "NumDays": null
        }
    }

    handleTokenIDChange = (event) => {
        this.setState({TokenID: parseInt(event.target.value)});
    }
    handleMetaverseIDChange = (event) => {
        this.setState({MetaverseID: parseInt(event.target.value)});
    }
    handleRoomIDChange = (event) => {
        this.setState({RoomID: parseInt(event.target.value)});
    }
    handleEventIDChange = (event) => {
        this.setState({EventID: parseInt(event.target.value)});
    }
    handleSessionIDChange = (event) => {
        this.setState({SessionID: parseInt(event.target.value)});
    }
    handleNameChange = (event) => {
        this.setState({Name: event.target.value});
    }
    handleDescriptionChange = (event) => {
        this.setState({Description: event.target.value});
    }
    handleURLChange = (event) => {
        this.setState({URL: event.target.value});
    }
    handleStartTimestampChange = (event) => {
        this.setState({StartTimestamp: parseInt(event.target.value)});
    }
    handleEndTimestampChange = (event) => {
        this.setState({EndTimestamp: parseInt(event.target.value)});
    }
    handleNumDaysChange = (event) => {
        this.setState({NumDays: parseInt(event.target.value)});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            'rAddress': this.props.identity.primaryaddresses[0],
            'tokenData': {
                tokenId: this.state.TokenID,
                metaverseId: this.state.MetaverseID,
                roomId: this.state.RoomID,
                eventId: this.state.EventID,
                sessionId: this.state.SessionID,
                name: this.state.Name,
                description: this.state.Description,
                url: this.state.URL,
                startTimestamp: this.state.StartTimestamp,
                endTimestamp: this.state.EndTimestamp,
                numDays: this.state.NumDays
            }
        }
        console.log(data);
        var config = {
          method: 'post',
          url: 'http://52.13.27.118:5000/createIdentityWithContentMultimap',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : JSON.stringify(data)
        };

        Axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });

        alert('Access token minting in progress...')
    }

    render() {
        return (
            <>
                <form style={{'display': 'flex', 'flexDirection': 'column'}} onSubmit={this.handleSubmit}>
                    <label style={{marginTop: '2vh'}}>
                      TokenID:
                      <input type="text" value={this.state.value} onChange={this.handleTokenIDChange} required />
                    </label>
                    <label style={{marginTop: '2vh'}}>
                      MetaverseID:
                      <input type="text" value={this.state.value} onChange={this.handleMetaverseIDChange} required />
                    </label>
                    <label style={{marginTop: '2vh'}}>
                      RoomID:
                      <input type="text" value={this.state.value} onChange={this.handleRoomIDChange} />
                    </label>
                    <label style={{marginTop: '2vh'}}>
                      EventID:
                      <input type="text" value={this.state.value} onChange={this.handleEventIDChange} />
                    </label>
                    <label style={{marginTop: '2vh'}}>
                      SessionID:
                      <input type="text" value={this.state.value} onChange={this.handleSessionIDChange} />
                    </label>
                    <label style={{marginTop: '2vh'}}>
                      Name:
                      <input type="text" value={this.state.value} onChange={this.handleNameChange} required />
                    </label>
                    <label style={{marginTop: '2vh'}}>
                      Description:
                      <input type="text" value={this.state.value} onChange={this.handleDescriptionChange} />
                    </label>
                    <label style={{marginTop: '2vh'}}>
                      URL:
                      <input type="text" value={this.state.value} onChange={this.handleURLChange} required />
                    </label>
                    <label style={{marginTop: '2vh'}}>
                      Start Timestamp:
                      <input type="text" value={this.state.value} onChange={this.handleStartTimestampChange} required />
                    </label>
                    <label style={{marginTop: '2vh'}}>
                      End Timestamp:
                      <input type="text" value={this.state.value} onChange={this.handleEndTimestampChange} />
                    </label>
                    <label style={{marginTop: '2vh'}}>
                      Number of Days:
                      <input type="text" value={this.state.value} onChange={this.handleNumDaysChange} />
                    </label>
                    <input style={{marginTop: '2vh'}} type="submit" value="Mint Access Token" />
                </form>
            </>
        )
    }
}