import React, { Component } from "react";
import Axios from "axios";


export default class ItemGridEvents extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	'tokens': []
        }
    }

    componentDidMount() {
    	var data = JSON.stringify({"rAddress":this.props.identity.primaryaddresses[0]});
			var config = {
			  method: 'post',
			  url: 'http://52.13.27.118:5000/getEvents',
			  headers: { 
			    'Content-Type': 'application/json'
			  },
			  data : data
			};
			var self = this;
			Axios(config)
			.then(function (response) {
			  console.log(response.data);
			  self.setState({tokens: response.data});
			})
			.catch(function (error) {
			  console.log(error);
			});

	    }

	  mintAccessToken = (parentIdentity) => {
	  	let data = {
            'rAddress': "RQC5brd7c9EXXfG2wt3fdLUWb8Cnieci3x",
            'eventIdentity': parentIdentity,
            'tokenData': {
                tokenId: Math.floor(Math.random() * 1000),
                startTimestamp: Math.floor(new Date().getTime() / 1000),
                endTimestamp: Math.floor((new Date().getTime() / 1000) + 3 * 24 * 60 * 60),
                numDays: 2
            }
        }
        console.log(data);
        var config = {
          method: 'post',
          url: 'http://52.13.27.118:5000/createAccessToken',
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

        alert('Access token creation in progress...')
	  }

    render() {
    	return (
    		<>
          <div style={{'display': 'flex', width:'90vw', marginTop:'1.5vh', overflow: 'auto'}}>
          	{this.state.tokens.map(token => {
		          return (
		              <div style={{backgroundColor: '#FFD166', padding:'5%', marginRight:'1vw', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
		              	<div>{token.name}</div>
		              	<button style={{marginTop: '1vh'}} type="button" className="btn btn-primary btn-block" onClick={() => this.mintAccessToken(token.name)}>Purchase Access Token</button>
		              </div>
		            )
		        })}
          </div>
    		</>
    		)
    }
}