import React, {useState} from 'react';
import axios from 'axios';

const PIWEBAPI_URL = 'https://coresight/piwebapi';
const AF_SERVER_NAME = 'AssetServerName';
const PI_SERVER_NAME = 'PIServerName';
const OSI_AF_DATABASE = 'DatabaseName';
const OSI_AF_ELEMENT = 'Pump1';
const OSI_AF_ATTRIBUTE_TAG = 'PumpStatus';

function PIAuthentication(req) {
  const [res, setRes] = useState({
    isLoading: false,
    isAuth: false,
    isError: {error: false, status: null, message: null},
  })
  console.log(req)
  function createHash(user, pass) {
    const token = user + ':' + pass
    const hash = window.btoa(token)
    // console.log(user + pass)
    // console.log(token)
    // console.log(hash)
    return "Basic " + hash
  }

  const tryAuth = (req) => {
    setRes({
      isLoading: true,
      isAuth: false,
      isError: {error: false, status: null, message: null},
    })
    axios({
      method: 'GET',
      url: PIWEBAPI_URL,
      Authorization: createHash(req.username, req.password)
    })
    .then(function (response) {
      setRes({
        isLoading: false,
        isAuth: true,
        isError: {error: false, status: null, message: null},
      })
      console.log(response);
    })
    .catch(function (error) {
      setRes({
        isLoading: false,
        isAuth: false,
        isError: {error: true, status: '201', message: 'error message'},
      })
      console.log("error " + error);
      if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
    })
    // .finally(function () {
    //   // always executed
    // });
  }

  return {tryAuth, res}
}

export default PIAuthentication

//error.response.status, message: error.message
