// import { Client } from 'verus-typescript-primitives/dist/vdxf/classes/Client';
// import {IDENTITY_VIEW, WALLET_VDXF_KEY, LOGIN_CONSENT_REQUEST_VDXF_KEY, LOGIN_CONSENT_REQUEST_SIG_VDXF_KEY, LOGIN_CONSENT_CLIENT_VDXF_KEY, LOGIN_CONSENT_REDIRECT_VDXF_KEY, LOGIN_CONSENT_CHALLENGE_VDXF_KEY, LOGIN_CONSENT_CONTEXT_ID_PROCUREMENT_SUBJECT_VDXF_KEY, LoginConsentResponse, VerusIDSignature, LoginConsentDecision, LoginConsentRequest, VDXFObject} from 'verus-typescript-primitives';
import { IDENTITY_VIEW, LoginConsentRequest, VerusIDSignature, LOGIN_CONSENT_REQUEST_SIG_VDXF_KEY, LOGIN_CONSENT_REDIRECT_VDXF_KEY, LOGIN_CONSENT_CONTEXT_ID_PROCUREMENT_SUBJECT_VDXF_KEY, VDXFObject } from 'verus-typescript-primitives';
import { Challenge, ChallengeInterface } from 'verus-typescript-primitives/dist/vdxf/classes/Challenge'
import * as deep  from "./deepLink";
import Axios from "axios";
import {signMessage} from "./database";
import {VerusIdInterface} from "verusid-ts-client";
// import { TEST_ID, VERUSTEST_I_ADDR } from 'verusid-ts-client/src/__tests__/fixtures/verusid';

const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

class RedirectUri extends VDXFObject {
  uri: string;

  constructor(uri: string, vdxfkey: string) {
    super(vdxfkey);

    this.uri = uri
  }

  stringable() {
    return {
      uri: this.uri,
      vdxfkey: this.vdxfkey
    };
  }
}

class Subject extends VDXFObject {
  data: string;

  constructor(data: string, vdxfkey: string) {
    super(vdxfkey);

    this.data = data
  }

  stringable() {
    return {
      data: this.data,
      vdxfkey: this.vdxfkey
    };
  }
}

export const verusLogin = async () => {

    const VerusId = new VerusIdInterface("VRSCTEST", "https://api.verus.services")

    //random salt
    const uuid = uuidv4();

    const challengeParams: ChallengeInterface = {
        challenge_id: uuid,// challenge specific random vdxf hash
        created_at: Date.now(), // current timestamp
        redirect_uris: [new RedirectUri("http://localhost:3000/verifyLogin?", LOGIN_CONSENT_REDIRECT_VDXF_KEY.vdxfid)],
        requested_access: [IDENTITY_VIEW.vdxfid], // needs to be changed to R-Address View Vdxf key
        // subject: [
        //   new Subject(
        //     "http://35.162.3.174:5000/verifyProvisioningRequest", //change to roomful server to verify provisioning request, provision id, send back provisioning response
        //     LOGIN_CONSENT_CONTEXT_ID_PROCUREMENT_SUBJECT_VDXF_KEY.vdxfid
        //   ),
        // ]
    }

    const loginConsentChallenge = new Challenge(challengeParams);

    // // const loginConsentChallenge = new Challenge(challengeParams);
    // const loginConsentRequest = await VerusId.createLoginConsentRequest({
    //      signingId: "i8jHXEEYEQ7KEoYe6eKXBib8cUBZ6vjWSd", //change to i-address for roomful login consent signer identity
    //      challenge: challengeParams,
    //      chainIAddr: VERUSTEST_I_ADDR
    //   })

    //requests server to sign message with roomful-login-consent@ (signer identity), and retreives result.
    console.log("message to be signed: ", loginConsentChallenge.toString());
    console.log(loginConsentChallenge.login_challenge);
    const result = await signMessage(loginConsentChallenge);

    let buff = loginConsentChallenge.toString();
    console.log("buff", buff);

    //create login consent request (signature request) and fires deeplink to verus desktop wallet. desktop wallet redirects to component described on line 21.
    const signature = result;
    console.log(signature)

    const verusIdSignature = new VerusIDSignature({signature
    }, LOGIN_CONSENT_REQUEST_SIG_VDXF_KEY);

    console.log(verusIdSignature);

    const loginConsentRequest = new LoginConsentRequest({
        system_id: "iJhCezBExJHvtyH3fGhNnt2NhU4Ztkf2yq", //iAddress of VRSCTEST
        signing_id: 'roomful-login-consent@',
        signature: verusIdSignature,
        challenge: loginConsentChallenge,
    });

    const walletRedirectUrl = deep.desktopWalletLogin(loginConsentRequest);
    console.log("walletRedirectUrl ", walletRedirectUrl);
    window.location.assign(walletRedirectUrl);

};