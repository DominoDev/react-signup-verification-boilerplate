import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';

function Nav() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    // only show nav when logged in
    //if (!user) return null;

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav">
                    <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                    {user &&
                        <NavLink to="/profile" className="nav-item nav-link">Profile</NavLink>
                    }
                    {user && user.role === Role.Admin &&
                        <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
                    }
                    {user &&
                        <a onClick={accountService.logout} className="nav-item nav-link">Logout</a>
                    }
                    {!user &&
                        <NavLink to="/account/login" className="nav-item nav-link">Login</NavLink>
                    }
                </div>
            </nav>
            <Route path="/admin" component={AdminNav} />
        </div>
    );
}

function AdminNav({ match }) {
    const { path } = match;

    return (
        <nav className="admin-nav navbar navbar-expand navbar-light">
            <div className="navbar-nav">
                <NavLink to={`${path}/users`} className="nav-item nav-link">Users</NavLink>
            </div>
            <div className="navbar-nav">
                <NavLink to={`${path}/listings`} className="nav-item nav-link">Listings</NavLink>
            </div>            
        </nav>
    );
}

export { Nav }; 