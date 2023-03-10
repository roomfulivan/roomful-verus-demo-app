import React, { Component } from "react";
import Axios from "axios";


export default class ItemGrid extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	'metaverseId': 1,
        	'roomId': null,
        	'eventId': null,
        	'sessionId': null,
        	'tokens': []
        }
    }

    componentDidMount() {
    	var data = JSON.stringify({"rAddress":this.props.identity.primaryaddresses[0],"metaverseId":this.state.metaverseId,"roomId":this.state.roomId,"eventId":this.state.eventId,"sessionId":this.state.sessionId});
			var config = {
			  method: 'post',
			  url: 'http://52.13.27.118:5000/getAccessTokens',
			  headers: { 
			    'Content-Type': 'application/json'
			  },
			  data : data
			};
			var self = this;
			Axios(config)
			.then(function (response) {
			  console.log(response.data);
			  self.setState({tokens: response.data.accessTokens});
			})
			.catch(function (error) {
			  console.log(error);
			});

	    }

    handleSubmit = (event) => {
    	event.preventDefault();
    	var data = JSON.stringify({"rAddress":this.props.identity.primaryaddresses[0],"metaverseId":this.state.metaverseId,"roomId":this.state.roomId,"eventId":this.state.eventId,"sessionId":this.state.sessionId});
			var config = {
			  method: 'post',
			  url: 'http://52.13.27.118:5000/getAccessTokens',
			  headers: { 
			    'Content-Type': 'application/json'
			  },
			  data : data
			};
			var self = this;
			Axios(config)
			.then(function (response) {
			  console.log(response.data);
			  self.setState({tokens: response.data.accessTokens});
			})
			.catch(function (error) {
			  console.log(error);
			});
	    }

	    handleMetaverseIDChange = (event) => {
	    	this.setState({metaverseId: parseInt(event.target.value)});
	    }

	    handleRoomIDChange = (event) => {
	    	this.setState({roomId: parseInt(event.target.value)});
	    }

	    handleEventIDChange = (event) => {
	    	this.setState({eventId: parseInt(event.target.value)});
	    }

	    handleSessionIDChange = (event) => {
	    	this.setState({sessionId: parseInt(event.target.value)});
	    }

    render() {
    	return (
    		<>
    			<form style={{'display': 'flex', 'flexDirection': 'column'}} onSubmit={this.handleSubmit}>
                    <label style={{marginTop: '2vh'}}>
                      MetaverseID:
                      <input type="text" value={this.state.value} onChange={this.handleMetaverseIDChange} placeholder='1' required />
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
                    <input style={{marginTop: '2vh'}} type="submit" value="Filter" />
                </form>
                <div style={{'display': 'flex', width:'90vw', marginTop:'1.5vh'}}>
                	{this.state.tokens.map(token => {
					          return (
					              <div style={{backgroundColor: '#FFD166', padding:'5%', marginRight:'1vw', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
					              	<div>{token.tokenId}</div>
					              	<div>{token.name}</div>
					              	<div>{token.url}</div>
					              	<div>{token.startTimestamp}</div>
					              </div>
					            )
					        })}
                </div>
    		</>
    		)
    }
}