import { Client } from 'verus-typescript-primitives/dist/vdxf/classes/Client';
import {WALLET_VDXF_KEY, LOGIN_CONSENT_REQUEST_VDXF_KEY, LOGIN_CONSENT_REQUEST_SIG_VDXF_KEY, LOGIN_CONSENT_CLIENT_VDXF_KEY, LOGIN_CONSENT_REDIRECT_VDXF_KEY, LOGIN_CONSENT_CHALLENGE_VDXF_KEY, LoginConsentResponse, VerusIDSignature, LoginConsentDecision, LoginConsentRequest} from 'verus-typescript-primitives';
import { Challenge, ChallengeInterface } from 'verus-typescript-primitives/dist/vdxf/classes/Challenge'
import * as deep  from "./deepLink";
import Axios from "axios";
import {signMessage} from "./database";

const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

export const verusLogin = async () => {

   //create new challenge with random salt (uuid)
    const challengeClient = new Client({
        client_id: 'roomi',
        name: 'Roomful Login',
        //@ts-ignore

        //IMPORTANT: edit the url with roomful redirect url. the component rendered by the redirect url should call checkLogin() from checkLogin.js.
        redirect_uris: ["http://localhost:3000/verifyLogin?"].map(uri => ({type: LOGIN_CONSENT_REDIRECT_VDXF_KEY.vdxfid, uri})),
    })

    //random salt
    const uuid = uuidv4();

    const challengeParams: ChallengeInterface = {
        uuid: uuid,
        request_url:"",
        login_challenge: uuid,
        requested_scope: ["i7TBEho8TUPg4ESPmGRiiDMGF55QJM37Xk"], 
        client: challengeClient
    }

    const loginConsentChallenge = new Challenge(challengeParams);

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
        chain_id: "VRSCTEST",
        signing_id: 'roomi@',
        signature: verusIdSignature,
        challenge: loginConsentChallenge,
    });

    const walletRedirectUrl = deep.desktopWalletLogin(loginConsentRequest);
    console.log("walletRedirectUrl ", walletRedirectUrl);
    window.location.assign(walletRedirectUrl);

};