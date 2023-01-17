import React, { Component } from "react";
import { verusLogin }from "../verus_modules/loginVerus";


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(){
        try {
           await verusLogin();
        }
        catch(e) {console.log(e);}
    };

    render() {
        return (
            <div>
                <h3>Sign In</h3>
                <button type="button" className="btn btn-primary btn-block" onClick={() => this.handleClick()}>Submit</button>
            </div>
        );
    }
}