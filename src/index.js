import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as firebase from 'firebase';
import { BrowserRouter } from 'react-router-dom'

const config = {
    apiKey: "AIzaSyCqiwzuGMvW3ePFFBJnCRg1Zddhj63qZnM",
    authDomain: "razareactapp.firebaseapp.com",
    databaseURL: "https://razareactapp.firebaseio.com",
    projectId: "razareactapp",
    storageBucket: "razareactapp.appspot.com",
    messagingSenderId: "955748494715"
};

export const fbapp = firebase.initializeApp(config);
export const facebookProvider = new firebase.auth.FacebookAuthProvider();


ReactDOM.render( 
    <BrowserRouter>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider> 
    </BrowserRouter>
 , document.getElementById('root'));
registerServiceWorker();