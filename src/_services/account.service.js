import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { fetchWrapper, history, useStorage } from '@/_helpers';

const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/accounts`;

export const accountService = {
    login,
    logout,
    refreshToken,
    register,
    verifyEmail,
    forgotPassword,
    validateResetToken,
    resetPassword,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value }
};

function login(email, password, remember) {
    return fetchWrapper.post(`${baseUrl}/authenticate`, { email, password })
        .then(user => {
            
            //useStorage("refreshToken", user.refreshToken, remember)

            if(remember){
                window.localStorage.setItem("refreshToken", user.refreshToken);
            }else{
                window.sessionStorage.setItem("refreshToken", user.refreshToken);
            }            

            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}

function logout() {
    // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
    let rToken = {};
    if (sessionStorage.getItem("refreshToken") != null) {
        rToken.token = sessionStorage.getItem("refreshToken");
        fetchWrapper.post(`${baseUrl}/revoke-token`, rToken);
        sessionStorage.removeItem("refreshToken");
    }

    if (localStorage.getItem("refreshToken") != null) {
        rToken.token = localStorage.getItem("refreshToken");
        fetchWrapper.post(`${baseUrl}/revoke-token`, rToken);
        localStorage.removeItem("refreshToken");
    }
    stopRefreshTokenTimer();
    userSubject.next(null);
    history.push('/');
}

function refreshToken() {
    let rToken = {};
    let session = false;
    if (sessionStorage.getItem("refreshToken") != null) {
        if (localStorage.getItem("refreshToken") != null) {
            rToken.token = localStorage.getItem("refreshToken");
            fetchWrapper.post(`${baseUrl}/revoke-token`, rToken);
            localStorage.removeItem("refreshToken");
        }   
        rToken.token = sessionStorage.getItem("refreshToken");
        session = true;
    }else if(localStorage.getItem("refreshToken") != null){
        rToken.token = localStorage.getItem("refreshToken");
    }
    return fetchWrapper.post(`${baseUrl}/refresh-token`, rToken)
        .then(user => {
            if(session){
                sessionStorage.setItem("refreshToken", user.refreshToken);
            }else{
                localStorage.setItem("refreshToken", user.refreshToken);
            }            
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}

function register(params) {
    return fetchWrapper.post(`${baseUrl}/register`, params);
}

function verifyEmail(token) {
    return fetchWrapper.post(`${baseUrl}/verify-email`, { token });
}

function forgotPassword(email) {
    return fetchWrapper.post(`${baseUrl}/forgot-password`, { email });
}

function validateResetToken(token) {
    return fetchWrapper.post(`${baseUrl}/validate-reset-token`, { token });
}

function resetPassword({ token, password, confirmPassword }) {
    return fetchWrapper.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(user => {
            // update stored user if the logged in user updated their own record
            if (user.id === userSubject.value.id) {
                // publish updated user to subscribers
                user = { ...userSubject.value, ...user };
                userSubject.next(user);
            }
            return user;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (id === userSubject.value.id) {
                logout();
            }
            return x;
        });
}

// helper functions

let refreshTokenTimeout;

function startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}
