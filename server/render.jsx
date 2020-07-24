import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';

import template from './template.js';
import Page from '../src/Page.jsx';
import store from '../src/store.js';
import routes from '../src/routes.js';

async function render(req,res){
    const activateRoute = routes.find(
        route => matchPath(req.path, route),
    );

    let resultData;
    if (activateRoute && activateRoute.component.fetchData){
        const match = matchPath(req.path, activateRoute)
        const index = req.url.indexOf('?');
        const search = index !== -1 ? req.url.substr(index) : null;
        resultData = await activateRoute.component.fetchData(match, search);
    }
    store.initialData = resultData;
    const context = {};
    const element = (
        <StaticRouter location={req.url} context={context}>
            <Page />
        </StaticRouter>
    );
    const body = ReactDOMServer.renderToString(element);
    if(context.url){
        res.redirect(301, context.url);
    }
    res.send(template(body, resultData));
}

export default render;