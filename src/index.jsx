import React from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';

import { history } from './_helpers';
import { accountService } from './_services';
import { App } from './app';

import './styles.less';

// setup fake backend
//import { configureFakeBackend } from './_helpers';
//configureFakeBackend();


const [locationData,setLocationData]=useState(null);
const getLocation=()=>{
    fetch('https://api.ipgeolocation.io/ipgeo?apiKey=f4373f8021b7448283da73f9abfa3160',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setLocationData(myJson)
      });
  }
  useEffect(()=>{
    getLocation()
  },[])

  // attempt silent token refresh before startup
  accountService.refreshToken().finally(startApp);

function startApp() { 
    render(
        <Router history={history}>
            <App />
            {
                locationData && <p>{locationData.ip}</p>
            }
        </Router>,
        document.getElementById('app')
    );
}