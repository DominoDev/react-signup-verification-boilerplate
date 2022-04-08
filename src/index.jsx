import React, { useState, useEffect } from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';
import { history, fetchWrapper } from './_helpers';
import { accountService } from './_services';
import { App } from './app';

import './styles.less';

const response = fetchWrapper.get("https://api.ipgeolocation.io/ipgeo?apiKey=f4373f8021b7448283da73f9abfa3160");
console.log(response)

// attempt silent token refresh before startup
accountService.refreshToken().finally(startApp);

function startApp() { 
    return render(
        <Router history={history}>
            <App />
        </Router>,
        document.getElementById('app')
    );
}