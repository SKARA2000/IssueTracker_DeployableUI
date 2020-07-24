import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../src/store.js';

import Page from '../src/Page.jsx';

store.initialData = window.__INTIAL_DATA__;

const element = (
    <Router>
        <Page />
    </Router>
);
ReactDOM.hydrate(element,document.getElementById("Content"));

if(module.hot){
    module.hot.accept();
}