import React from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '@/_services';

function Details({ match }) {
    const { path } = match;
    const user = accountService.userValue;

    return (
        <div>
            <h1>My Profile</h1>
            
                <div>{user.title} {user.firstName} {user.lastName}</div>
                <div>{user.address1}</div>
                {
                (user.address2 == '')
                ? null
                : <div> {user.address2} </div>  
                }
                <div>{user.city} {user.state}, {user.postalCode}</div>
                <div> {user.email}</div>
            
            <p><Link to={`${path}/update`}>Update Profile</Link></p>
        </div>
    );
}

export { Details };