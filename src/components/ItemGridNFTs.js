import React, { Component } from "react";
import Axios from "axios";


export default class ItemGridNFTs extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	'tokens': []
        }
    }

    componentDidMount() {
    	var data = JSON.stringify({"rAddress":this.props.identity.primaryaddresses[0], "collectionId": this.props.collectionId});
			var config = {
			  method: 'post',
			  url: 'http://52.13.27.118:5000/getNFTsOwnedInCollection',
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


    render() {
    	return (
    		<>
          <div style={{'display': 'flex', width:'90vw', marginTop:'1.5vh'}}>
          	{this.state.tokens.map(token => {
		          return (
		              <div style={{backgroundColor: '#FFD166', padding:'5%', marginRight:'1vw', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
		              	<div>{this.props.collectionId + " #" + token.name}</div>
		              </div>
		            )
		        })}
          </div>
    		</>
    		)
    }
}