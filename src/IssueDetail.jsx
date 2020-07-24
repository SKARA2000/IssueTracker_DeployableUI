import React from 'react';
import graphQLFetch from './graphQLFetch.js';
import Toast from './Toast.jsx';

export default function IssueDetail({ issue }){
    if(issue){
        return (
            <div>
                <h3>Description</h3>
                <pre>{issue.description}</pre>
            </div>
        );
    }
    return null;
}