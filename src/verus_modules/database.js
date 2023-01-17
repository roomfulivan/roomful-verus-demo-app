import Axios from "axios";

//api request to sign message with roomful-consent-login@ (signer identity). returns signature object.
export const signMessage = async (loginConsentChallenge) => {
  let result = await signMessageHelper(loginConsentChallenge);
  console.log(result);
  return result;
}

const signMessageHelper = (loginConsentChallenge) => {
  // Axios.defaults.withCredentials = true;

  var data = JSON.stringify({"loginChallenge":loginConsentChallenge.toString()});
  console.log(data)

  var config = {
    method: 'post',
    url: 'http://35.92.172.176:5000/signMessage',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  var axios_response = Axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      console.log(response.data.result.signature)
      return response.data.result.signature;
    })
    .catch(function (error) {
      console.log(error);
      return null;
    });

  console.log(axios_response)
  return axios_response;
}


//api request to verify message signed by user. returns true if successfull, false if fail, null if error.
export const verifyMessage = async (params) => {
  let result = await verifyMessageHelper(params);
  return result;
}

const verifyMessageHelper = (params) => {
  // Axios.defaults.withCredentials = true;

  var data = JSON.stringify({"signature":params[1],"signingId":params[0],"signedData": params[2]});

  var config = {
    method: 'post',
    url: 'http://35.92.172.176:5000/verifyMessage',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  const axios_response = Axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
    return null;
  });

  console.log(axios_response)
  return axios_response;
}


export const getIdentity = async (identity) => {
  // Axios.defaults.withCredentials = true;
   try {
    const result = await Axios.post("http://35.92.172.176:5000/getIdentity", {
        params: identity,
      });
      
     return result.data;
 
   } catch (e) {
     console.log(e);
     return null;
   }
}

export const obfuscateDocument = async (doc) => {
  // Axios.defaults.withCredentials = true;
   try {
    const result = await Axios.post("http://35.92.172.176:5000/obfuscateDocument", {
        params: JSON.stringify(doc),
      });
      
     return result.data;
 
   } catch (e) {
     console.log(e);
     return null;
   }
}


