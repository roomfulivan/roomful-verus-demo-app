import React, { Component } from "react";
import { verusLogin }from "../verus_modules/loginVerus";
import { QRCodeCanvas } from "qrcode.react";


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'url': null,
            'mode': null,
            'loginInitiated': false,
            'loginSuccessful': false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.connection = new WebSocket('ws://18.237.208.201:3000');
        // this.connection = new WebSocket('ws://127.0.0.1:3000');
        // listen to onmessage event
        this.connection.onmessage = evt => { 
            // add the new message to state
            console.log(evt.data);

            if (evt.data !== 'connection established') {        //dont need to worry about default response upon connection
                //checks event to see if login was successful
                let verificationResult = JSON.parse(evt.data);
                console.log(verificationResult);
                if (verificationResult.verificationResult.result) {
                    this.setState({loginSuccessful: true});
                } else {
                    this.setState({loginSuccessful: false});
                }
            }

        };

        // // for testing purposes send message to websotcket with interval
        // setInterval( _ => {
        //     this.connection.send( Math.random() )
        // }, 2000 )
    }

    async handleClick(mode) {
        let walletRedirectUrl = await verusLogin();
        this.setState({url: walletRedirectUrl});
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
            content = <div>Login Successful</div>
        }
        return (
            <div style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', width:'100vw', height:'100vh'}}>
                {content}
            </div>
        );
    }
}