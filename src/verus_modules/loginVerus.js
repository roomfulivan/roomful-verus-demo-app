import Axios from "axios";


export const verusLogin = async () => {

    // Change to Roomful URLs!!!
    const body = {
      baseUrl: 'http://roomful.net/'
    }

    var config = {
      method: 'post',
      url: 'http://52.13.27.118:3000/verusIdLogin',
      headers: { 
        'Content-Type': 'application/json'
      },
      json : body
    };

    let walletRedirectUrl;
    let challengeId;
    try {
      const res = await Axios(config);
      console.log(res.data);
      walletRedirectUrl = res.data.deepLink;
      challengeId = res.data.challengeId;
    } catch {
      // in case server is down, use hardcoded deeplink and challengeId
      walletRedirectUrl = "i5jtwbp6zymeay9llnraglgjqgdrffsau4://x-callback-url/i3dQmgjq8L8XFGQUrs9Gpo8zvPWqs1KMtV/?i3dQmgjq8L8XFGQUrs9Gpo8zvPWqs1KMtV=Aa4uvSgsLAWiinJ7Go12_G6zOcUB_SwBpu-eojVjXjKBJP80KdufnpG2Ti25QPm3OsMIWNyD6aDuiIdRLc4A7t3vHSRMeg9ysAUJ8BfPPdpjudQGAUkCBeX2AAABQSBt-4ucfXT7nIipBh4pC7uMlSmGV4R-TM3LnSO8Id77CGckNAI7uGLK2ECcglIVa-8DPG2O0b0Tm2ypTfLF1z_AGSnAPo-o1JwfjbV2JpOK-1fENZwBjxTBSbV2kr8p-JMe9yHu4_7RbGm2z7PBymMAAAAAAAAAAbqJxOWocEcouGM6Y-K9sqH6R6uuAQAAAAAAAW5VlRgDfKbJR3ryHsyWvdxhwtKmASZodHRwczovL29tZWdhLnJvb21mdWwubmV0L3ZlcmlmeUxvZ2luP1Z7moexcTH27rLdC90ZHs5KXWA7AQEA";
      challengeId = "iGMKJAyfM5MCwtEAtV3Ad1XiMGAxUTaMpp";
    }

    console.log(walletRedirectUrl);
    console.log(challengeId);
    return {walletRedirectUrl, challengeId};

};