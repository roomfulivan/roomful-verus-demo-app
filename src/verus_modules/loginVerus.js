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

    // Change to Roomful URLs!!!
    const body = {
      baseUrl: 'http://127.0.0.1:3000/',
      redirectUrl: 'http://127.0.0.1:3000/verifyLogin?'
    }

    var config = {
      method: 'post',
      url: 'http://18.237.208.201:3000/verusIdLogin',
      headers: { 
        'Content-Type': 'application/json'
      },
      json : body
    };

    let walletRedirectUrl;
    try {
      const res = await Axios(config);
      console.log(res.data);
      walletRedirectUrl = res.data.deepLink;
    } catch {
      // in case server is down, use hardcoded deeplink
      walletRedirectUrl = "i5jtwbp6zymeay9llnraglgjqgdrffsau4://x-callback-url/i3dQmgjq8L8XFGQUrs9Gpo8zvPWqs1KMtV/?i3dQmgjq8L8XFGQUrs9Gpo8zvPWqs1KMtV=Aa4uvSgsLAWiinJ7Go12_G6zOcUB_SwBpu-eojVjXjKBJP80KdufnpG2Ti25QPm3OsMIWNyD6aDuiIdRLc4A7t3vHSRMeg9ysAUJ8BfPPdpjudQGAUkCBeX2AAABQSBt-4ucfXT7nIipBh4pC7uMlSmGV4R-TM3LnSO8Id77CGckNAI7uGLK2ECcglIVa-8DPG2O0b0Tm2ypTfLF1z_AGSnAPo-o1JwfjbV2JpOK-1fENZwBjxTBSbV2kr8p-JMe9yHu4_7RbGm2z7PBymMAAAAAAAAAAbqJxOWocEcouGM6Y-K9sqH6R6uuAQAAAAAAAW5VlRgDfKbJR3ryHsyWvdxhwtKmASZodHRwczovL29tZWdhLnJvb21mdWwubmV0L3ZlcmlmeUxvZ2luP1Z7moexcTH27rLdC90ZHs5KXWA7AQEA";
    }

    console.log(walletRedirectUrl);
    return walletRedirectUrl;

};