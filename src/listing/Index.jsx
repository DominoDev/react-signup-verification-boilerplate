import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { accountService, listingService } from '@/_services';

import { AddListing } from './AddListing';

function Listing({ history, match }) {
    const { path } = match;

    useEffect(() => {
        // redirect to home if already logged in
        if (accountService.userValue) {
            history.push('/');
        }
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8 offset-sm-2 mt-5">
                    <div className="card m-3">
                        <Switch>
                            <Route path={`${path}/add`} component={AddListing} />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Listing };