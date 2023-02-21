import React, { Component } from "react";
import ItemGrid from "./ItemGrid";
import MintForm from "./MintForm";



export default class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {
			'mode': 'accessToken',
			'actionMode': 'mint'
		};
	}

	toggleActionMode = (newActionMode) => {
		this.setState({actionMode: newActionMode});
	}

	render() {
		let toggleButton;
		if (this.state.actionMode === 'view') {
			toggleButton = <button style={{marginTop: '2vh'}} type="button" className="btn btn-primary btn-block" onClick={() => this.toggleActionMode('mint')}>Mint Access Token</button>
		} else {
			toggleButton = <button style={{marginTop: '2vh'}} type="button" className="btn btn-primary btn-block" onClick={() => this.toggleActionMode('view')}>View Access Token(s)</button>	
		}
		return (
			<>	
				<div>Login Successful</div>
                <div style={{marginTop:'1vh'}}>
                    Logged in as: {this.props.identity.name}
                </div>
				{toggleButton}
				{this.state.actionMode == 'view' ? 
				<ItemGrid identity={this.props.identity} mode={this.state.mode}/>
				:
				<MintForm identity={this.props.identity} mode={this.state.mode}/>
				}
			</>
			)
	}
}