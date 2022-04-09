import React from 'react';
import { Storage } from '@/_components';

import { accountService } from '@/_services';

function Home() {
   // const user = accountService.userValue;
    
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi User!</h1> 
                 <Storage />
            </div>
        </div>
    );
}

export { Home };