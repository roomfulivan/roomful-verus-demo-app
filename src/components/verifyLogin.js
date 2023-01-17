import React, { Component, useEffect } from "react";
import {checkLogin} from "../verus_modules/checkLogin";
import {checkUser} from "../verus_modules/database";
import {
SIGNATURE_INVALID,
SIGNATURE_OK
} from '../verus_modules/constants'


export default class VerifyLogin extends Component {
    
  constructor(props) {
      super(props);
      this.state = {loginStatus: false}
      this.checkLoginChallenge = this.checkLoginChallenge.bind(this);;
  }
    
  async componentDidMount(){
      await this.checkLoginChallenge()
  }

    
  async checkLoginChallenge() {
      const {result, data, identity} = await checkLogin();
      console.log(result)
      if(result == SIGNATURE_INVALID){
        this.setState({loginStatus: false});
        return ;
      } else if (result == SIGNATURE_OK){
        this.setState({loginStatus: true});
        this.setState({identity: identity})
      } 
  }

  render() {
    return (
        <>
          <div>{this.state.loginStatus.toString()}</div>
          <div>{this.state.identity.toString()}</div>
        </>
      );
  }
}