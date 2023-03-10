import React, { Component } from "react";
import ItemGrid from "./ItemGrid";
import ItemGridNFT from "./ItemGridNFTs";
import ItemGridEvents from "./ItemGridEvents";
import Gallery from "./Gallery";



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
		let toggleButton2;
		let toggleButton3;
		if (this.state.actionMode === 'viewNFTs' || this.state.actionMode === 'viewEvents') {
			toggleButton = <button style={{marginTop: '2vh'}} type="button" className="btn btn-primary btn-block" onClick={() => this.toggleActionMode('mint')}>View Gallery</button>
			toggleButton2 = <></>
			toggleButton3 = <></>
		} else {
			toggleButton = <button style={{marginTop: '2vh'}} type="button" className="btn btn-primary btn-block" onClick={() => this.toggleActionMode('viewEvents')}>View Event(s)</button>
			toggleButton2 = <button style={{marginTop: '1vh'}} type="button" className="btn btn-primary btn-block" onClick={() => this.toggleActionMode('viewNFTs')}>View NFT(s)</button>
			toggleButton3 = <button style={{marginTop: '1vh'}} type="button" className="btn btn-primary btn-block" onClick={() => this.toggleActionMode('viewAccessTokens')}>View Access Token(s)</button>
		}

		let itemGrid;
		if (this.state.actionMode === 'viewNFTs') {
			itemGrid = <><ItemGridNFT identity={this.props.identity} mode={this.state.actionMode} collectionId="ivans_awesome_nfts"/></>
		} else if (this.state.actionMode === 'viewEvents') {
			itemGrid = <><ItemGridEvents identity={this.props.identity} mode={this.state.actionMode}/></>
		} else if (this.state.actionMode === 'viewAccessTokens') {
			itemGrid = <><ItemGrid identity={this.props.identity} mode={this.state.actionMode}/></>
		}

		let content;
		if (this.state.actionMode.includes('view')) {
			content = itemGrid;
		} else {
			content = <Gallery identity={this.props.identity} mode={this.state.actionMode}/>
		}

		return (
			<>	
				<div>Login Successful</div>
                <div style={{marginTop:'1vh'}}>
                    Logged in as: {this.props.identity.name}
                </div>
                <div style={{marginTop:'1vh'}}>
                    Metaverse ID: 1
                </div>
                <div style={{marginTop:'1vh'}}>
                    Room ID: 1
                </div>
				{toggleButton}
				{toggleButton2}
				{toggleButton3}
				{content}
			</>
			)
	}
}