import React from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';
import { history } from './_helpers';
import { accountService } from './_services';
import { App } from './app';

import './styles.less';



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

