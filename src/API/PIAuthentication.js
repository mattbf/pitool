import React, {useState} from 'react';
import axios from 'axios';

const PIWEBAPI_URL = 'https://mydomain.com/piwebapi';
const AF_SERVER_NAME = 'AssetServerName';
const PI_SERVER_NAME = 'PIServerName';
const OSI_AF_DATABASE = 'DatabaseName';
const OSI_AF_ELEMENT = 'Pump1';
const OSI_AF_ATTRIBUTE_TAG = 'PumpStatus';

function PIAuthentication(req) {
  const [res, setRes] = useState({
    isLoading: false,
    isAuth: false,
    isError: false,
  })
  console.log(req)
  function createHash(user, pass) {
    const token = user + ':' + pass
    const hash = window.btoa(token)
    return "Basic " + hash
  }

  const tryAuth = (req) => {
    setRes({
      isLoading: true,
      isAuth: false,
      isError: false,
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
        isError: false,
      })
      console.log(response);
    })
    .catch(function (error) {
      setRes({
        isLoading: false,
        isAuth: false,
        isError: true,
      })
      console.log(error);
    })
    // .finally(function () {
    //   // always executed
    // });
  }

  return tryAuth
}

export default PIAuthentication
