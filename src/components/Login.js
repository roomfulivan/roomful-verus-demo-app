import React, { Component } from "react";
import { verusLogin }from "../verus_modules/loginVerus";
import { QRCodeCanvas } from "qrcode.react";


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'url': null,
            'mode': null
        };
        this.handleClick = this.handleClick.bind(this);
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
        const qrcode = (
            <QRCodeCanvas
              id="qrCode"
              value={this.state.url}
              size={300}
              bgColor={"#00ff00"}
              level={"H"}
            />
          );
        return (
            <div style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', width:'100vw', height:'100vh'}}>
                <h3>Verus ID Login</h3>
                <button type="button" className="btn btn-primary btn-block" onClick={() => this.handleClick('desktop')}>Desktop Wallet Login</button>
                <button style={{marginTop:'1vh'}} type="button" className="btn btn-primary btn-block" onClick={() => this.handleClick('mobile')}>Mobile Wallet Login</button>
                {this.state.mode == 'mobile' ?
                    <div style={{marginTop:'1vh'}}>
                    {qrcode}
                    </div>
                    :
                    <></>
                }
            </div>
        );
    }
}