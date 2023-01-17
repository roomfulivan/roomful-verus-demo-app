import {WALLET_VDXF_KEY, LOGIN_CONSENT_REQUEST_VDXF_KEY, LOGIN_CONSENT_REQUEST_SIG_VDXF_KEY, LOGIN_CONSENT_CLIENT_VDXF_KEY, LOGIN_CONSENT_REDIRECT_VDXF_KEY, LOGIN_CONSENT_CHALLENGE_VDXF_KEY, LoginConsentResponse, VerusIDSignature, LoginConsentDecision, LoginConsentRequest} from 'verus-typescript-primitives';
import {Buffer} from 'buffer';

//Returns redirect deeplink url that fires verus desktop app with login signature request.
export const desktopWalletLogin = (data) => {


    let buff = new Buffer(data.toString());
    let base64data = buff.toString('base64');

   return `${WALLET_VDXF_KEY.vdxfid}://x-callback-url/${LOGIN_CONSENT_REQUEST_VDXF_KEY.vdxfid}/?${LOGIN_CONSENT_REQUEST_VDXF_KEY.vdxfid}=${base64data})}`
};