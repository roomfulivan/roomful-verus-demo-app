import {WALLET_VDXF_KEY, LOGIN_CONSENT_REQUEST_VDXF_KEY, LOGIN_CONSENT_REQUEST_SIG_VDXF_KEY, LOGIN_CONSENT_CLIENT_VDXF_KEY, LOGIN_CONSENT_REDIRECT_VDXF_KEY, LOGIN_CONSENT_CHALLENGE_VDXF_KEY, LoginConsentResponse, VerusIDSignature, LoginConsentDecision, LoginConsentRequest} from 'verus-typescript-primitives';
import {Buffer} from 'buffer';

//Returns redirect deeplink url that fires verus desktop app with login signature request.
export const desktopWalletLogin = (data) => {


    let buff = new Buffer(data.toString());
    let base64data = buff.toString('base64');

    //i5JtwbP6zyMEAy9LLnRAGLgJQGdRFfsAu4://x-callback-url/i3dQmgjq8L8XFGQUrs9Gpo8zvPWqs1KMtV/?i3dQmgjq8L8XFGQUrs9Gpo8zvPWqs1KMtV=i5jtwbp6zymeay9llnraglgjqgdrffsau4://x-callback-url/i3dQmgjq8L8XFGQUrs9Gpo8zvPWqs1KMtV/?i3dQmgjq8L8XFGQUrs9Gpo8zvPWqs1KMtV=Aa4uvSgsLAWiinJ7Go12_G6zOcUB_SgBpu-eojVjXjKBJP80KdufnpG2Ti23-esoawBRkuwKmZFzhfUkCkB9Td3vHSRMeg9ysAUJ8BfPPdpjudQGAUkCBU7yAAABQSA8cEeOSI53OMaYtkkIUXruhTWXWhqWaaVLL5z3p2nizBPxDWSpQQ1dCjLtmhSCOxug-7JiuzNd0Lwnjg9dDbTOGSnAPo-o1JwfjbV2JpOK-1fENZwBixSm756iNWNeMoEk_zQp25-ekbZOLZ6hyWMAAAAAAAAAAbqJxOWocEcouGM6Y-K9sqH6R6uuAQAAAAAAAW5VlRgDfKbJR3ryHsyWvdxhwtKmASJodHRwOi8vMTI3LjAuMC4xOjMwMDAvdmVyaWZ5TG9naW4_Vnuah7FxMfbust0L3RkezkpdYDsBAQA
   return `${WALLET_VDXF_KEY.vdxfid}://x-callback-url/${LOGIN_CONSENT_REQUEST_VDXF_KEY.vdxfid}/?${LOGIN_CONSENT_REQUEST_VDXF_KEY.vdxfid}=${base64data})}`
};