import { Meteor } from 'meteor/meteor';
import React from 'react';
import {Router,Route,browserHistory} from "react-router";

import Signup from "../ui/Signup";
import Dashboard from "../ui/Dashboard";
import Login from "../ui/Login";
import NotFound from "../ui/NotFound";

const unauthenticatedPages =['/','/signup'];
const authenticatedPages=['/dashboard'];
const onEnterPublicPage = ()=>{
    if(Meteor.userId()){
        browserHistory.replace('/dashboard');
    }
};
const onEnterPrivatePage=()=>{
    if(!Meteor.userId()){
        browserHistory.replace('/');
    }
};
export const onAuthChange = (isAuthenticated)=> {
    const pathname =browserHistory.getCurrentLocation().pathname;
    //so here we check if the current page is in the array for UnauthenticatedPages
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
    if(isUnauthenticatedPage && isAuthenticated){
        browserHistory.replace('/dashboard');
    }else if(isAuthenticatedPage && !isAuthenticated){
        browserHistory.replace('/');
    }
};
export const routes=(
    <Router history={browserHistory}>
        <Route path='/' component={Login} onEnter={onEnterPublicPage}/>
        <Route path='/signup' component={Signup} onEnter={onEnterPublicPage}/>
        <Route path='/dashboard' component={Dashboard} onEnter={onEnterPrivatePage} />
        <Route path='*' component={NotFound}/>
    </Router>
);