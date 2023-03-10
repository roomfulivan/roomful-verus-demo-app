import React, { Component } from "react";
import Axios from "axios";
import BoredApe from '../BoredApe.jpg';
import MoonBird from '../Moonbird.png';



export default class MintForm extends Component {
	constructor(props) {
        super(props);
        this.state = {
            "TokenID": null,
            "MetaverseID": 1,
            "RoomID": 1,
            "Name": null,
            "Description": null,
            "URL": null,
            "StartTimestamp": null,
            "EndTimestamp": null,
            "NumDays": null,
            "collectionName": null,
            "baseUri": ""
        }
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
    handleCollectionNameChange = (event) => {
        this.setState({collectionName: event.target.value});
    }
    handleBaseUriChange = (event) => {
        this.setState({baseUri: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            'rAddress': "RQC5brd7c9EXXfG2wt3fdLUWb8Cnieci3x",
            'creatorIdentity': "ivan@",
            'eventData': {
                metaverseId: this.state.MetaverseID,
                roomId: this.state.RoomID,
                eventId: Math.floor(Math.random() * 1000),
                name: this.state.Name,
                description: this.state.Description,
                url: this.state.URL,
                startTimestamp: Math.floor(new Date().getTime() / 1000),
                endTimestamp: Math.floor((new Date().getTime() / 1000) + 3 * 24 * 60 * 60),
            }
        }
        console.log(data);
        var config = {
          method: 'post',
          url: 'http://52.13.27.118:5000/createEvent',
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

        alert('Event creation in progress...')
    }

    handleNFTSubmit = (event) => {
        event.preventDefault();
        let data = {
            'rAddress': "RQC5brd7c9EXXfG2wt3fdLUWb8Cnieci3x",
            'creatorIdentity': "ivan@",
            'collectionData': {
                metaverseId: this.state.MetaverseID,
                roomId: this.state.RoomID,
                collectionName: this.state.collectionName,
                name: this.state.Name,
                description: this.state.Description,
                url: this.state.URL,
                baseUri: this.state.baseUri
            }
        }
        console.log(data);
        var config = {
          method: 'post',
          url: 'http://52.13.27.118:5000/createVerusNFTCollection',
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

        alert('Event creation in progress...')
    }

    mintNFT = (filename) => {
        let data = {
            'rAddress': "RQC5brd7c9EXXfG2wt3fdLUWb8Cnieci3x",
            'tokenId': Math.floor(Math.random() * 1000),
            'collectionId': this.state.collectionName
        }
        console.log(data);
        var config = {
          method: 'post',
          url: 'http://52.13.27.118:5000/mintVerusNFTInCollection',
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

        alert('Event creation in progress...')
    }

    render() {
        return (
            <div style={{display:'flex', flexDirection:'column', height:'100%', width:'100%'}}>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'center', height:'40%', width:'100%', marginTop:'3vh'}}>
                    <form style={{'display': 'flex', 'flexDirection': 'column', marginRight:'5vw'}} onSubmit={this.handleSubmit}>
                        <div>Create Event for Gallery</div>
                        <label style={{marginTop: '2vh'}}>
                          Name:
                          <input type="text" value={this.state.value} onChange={this.handleNameChange} required />
                        </label>
                        <label style={{marginTop: '2vh'}}>
                          Description:
                          <input type="text" value={this.state.value} onChange={this.handleDescriptionChange} />
                        </label>
                        <label style={{marginTop: '2vh'}}>
                          Start Timestamp:
                          <input type="text" value={this.state.value} placeholder='now' onChange={this.handleStartTimestampChange} />
                        </label>
                        <label style={{marginTop: '2vh'}}>
                          Duration in # of days:
                          <input type="text" value={this.state.value} placeholder='3' onChange={this.handleEndTimestampChange} />
                        </label>
                        <label style={{marginTop: '2vh'}}>
                          URL:
                          <input type="text" value={this.state.value} onChange={this.handleURLChange} />
                        </label>
                        <input style={{marginTop: '2vh'}} type="submit" value="Create Event" />
                    </form>
                    <form style={{'display': 'flex', 'flexDirection': 'column', marginLeft:'5vw'}} onSubmit={this.handleNFTSubmit}>
                        <div>Create NFT Collection for Gallery</div>
                        <label style={{marginTop: '2vh'}}>
                          Collection VerusID Name:
                          <input type="text" value={this.state.value} onChange={this.handleCollectionNameChange} required />
                        </label>
                        <label style={{marginTop: '2vh'}}>
                          Collection Name:
                          <input type="text" value={this.state.value} onChange={this.handleNameChange} required />
                        </label>
                        <label style={{marginTop: '2vh'}}>
                          Description:
                          <input type="text" value={this.state.value} onChange={this.handleDescriptionChange} />
                        </label>
                        <label style={{marginTop: '2vh'}}>
                          URL:
                          <input type="text" value={this.state.value} onChange={this.handleURLChange} />
                        </label>
                        <label style={{marginTop: '2vh'}}>
                          Base URI for metadata:
                          <input type="text" value={this.state.value} onChange={this.handleBaseUriChange} />
                        </label>
                        <input style={{marginTop: '2vh'}} type="submit" value="Create NFT Collection" />
                    </form>
                </div>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'center', height:'50%', width:'100%'}}>
                    <div style={{display:'flex', flexDirection:'column', marginRight:'5vw'}}>
                        <img src={BoredApe} style={{height:'25vh', width:'25vh'}}/>
                        {this.state.collectionName !== null ?
                            <button style={{marginTop: '2vh'}} type="button" className="btn btn-primary btn-block" onClick={() => this.mintNFT('BoredApe.jpg')}>Mint NFT as Part of Collection</button>
                            :
                            <button style={{marginTop: '2vh'}} type="button" className="btn btn-primary btn-block" disabled>Mint NFT as Part of Collection</button>
                        }
                    </div>
                    <div style={{display:'flex', flexDirection:'column', marginLeft:'5vw'}}>
                        <img src={MoonBird} style={{height:'25vh', width:'25vh'}}/>
                        {this.state.collectionName !== null ?
                            <button style={{marginTop: '2vh'}} type="button" className="btn btn-primary btn-block" onClick={() => this.mintNFT('Moonbird.png')}>Mint NFT as Part of Collection</button>
                            :
                            <button style={{marginTop: '2vh'}} type="button" className="btn btn-primary btn-block" disabled>Mint NFT as Part of Collection</button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}