import React, { Component } from "react";
import { verusLogin } from "../verus_modules/loginVerus";
import { QRCodeCanvas } from "qrcode.react";
import Main from "./Main";


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'url': null,
            'mode': null,
            'loginSuccessful': false,
            'challengeId': null,
            'identity': null
        };
        this.handleClick = this.handleClick.bind(this);
    }

    //open websocket connection when login component is mounted to subscribe to login response updates
    componentDidMount() {
        this.connection = new WebSocket('ws://52.13.27.118:3000');

        // listen for events
        this.connection.onmessage = evt => { 
            // add the new message to state
            console.log(evt.data);

            if (evt.data !== 'connection established') {        //dont need to worry about default response upon connection
                //checks event to see if login was successful
                let verificationResult = JSON.parse(evt.data);
                console.log(verificationResult);

                //we check if challengeId matches our challengeId from login request and if the verificationResult is true
                if (verificationResult.challengeId === this.state.challengeId && verificationResult.verificationResult) {
                    this.setState({identity: verificationResult.identity});
                    this.setState({loginSuccessful: true});
                } else {
                    this.setState({loginSuccessful: false});
                }
            }
        };
    }

    async handleClick(mode) {
        let {walletRedirectUrl, challengeId} = await verusLogin();
        this.setState({url: walletRedirectUrl});
        this.setState({challengeId: challengeId}); //set challengeId so we can compare it to websocket events
        if (mode == "desktop") {
            this.setState({mode: 'desktop'});
            window.location.assign(walletRedirectUrl);
        } else {
            this.setState({mode: 'mobile'});
        }
    };

    render() {
        let qrcode = <></>;
        let content;
        if (this.state.mode == 'mobile') {
            qrcode = (
            <QRCodeCanvas
              id="qrCode"
              value={this.state.url}
              size={300}
              bgColor={"#00ff00"}
              level={"H"}
            />
          );
        }
        if (!this.state.loginSuccessful) {
            content = (
                <>
                <h3>Verus ID Login</h3>
                <button type="button" className="btn btn-primary btn-block" onClick={() => this.handleClick('desktop')}>Desktop Wallet Login</button>
                <button style={{marginTop:'1vh'}} type="button" className="btn btn-primary btn-block" onClick={() => this.handleClick('mobile')}>Mobile Wallet Login</button>
                <div style={{marginTop:'1vh'}}>
                    {qrcode}
                </div>
                </>
            )
        } else {
            content = <Main identity={this.state.identity} />
        }
        
        return (
            <div style={{display:'flex', flexDirection: 'column', alignItems:'center', width:'100vw', height:'100vh'}}>
                {content}
            </div>
        );
    }
}