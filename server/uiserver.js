import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import proxy from 'http-proxy-middleware';
import SourceMapSupport from 'source-map-support';

import render from './render.jsx';

const app = express();

SourceMapSupport.install();
dotenv.config();

const apiProxyTarget = process.env.API_PROXY_TARGET;
if(apiProxyTarget){
    app.use('/graphql', proxy({ target: apiProxyTarget, changeOrigin: true }));
    console.log(`Proxy for API server created`);
}

const enableHMR = process.env.ENABLE_HMR === 'true';

if(enableHMR && (process.env.NODE_ENV !== 'production')){
    console.log('Adding dev middleware, enabling HMR');
    const webpack = require('webpack');
    const devMiddleWare = require('webpack-dev-middleware');
    const hotMiddleware = require('webpack-hot-middleware');

    const config = require('../webpack.config.js')[0];
    config.entry.app.push('webpack-hot-middleware/client');
    config.plugins = config.plugins || [];
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    const compiler = webpack(config);
    app.use(devMiddleWare(compiler));
    app.use(hotMiddleware(compiler));
}

// app.use('/',express.static(path.resolve(__dirname,'public')))

const port = process.env.PORT||8000;

if(!process.env.UI_API_ENDPOINT){
    process.env.UI_API_ENDPOINT = 'http://localhost:5000/graphql';
}

if(!process.env.UI_SERVER_API_ENDPOINT){
    process.env.UI_SERVER_API_ENDPOINT = process.env.UI_API_ENDPOINT;
}

app.get('/env.js', function(req,res){
    const env = { UI_API_ENDPOINT: process.env.UI_API_ENDPOINT };
    res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.get('/bootstrap.min.css', function(req, res) {
    res.sendFile(path.resolve('node_modules/bootstrap/dist/css/bootstrap.min.css'));
});

app.use(express.static('public'));

app.get('*', (req,res,next) => {
    render(req,res,next);
})


app.listen(port,function(){
    console.log(`UI server started port ${port}`);
});

if(module.hot){
    module.hot.accept('./render.jsx');
}