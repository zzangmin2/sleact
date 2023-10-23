import React from 'react';
import loadable from "@loadable/component";
import {Switch, Route, Redirect} from "react-router-dom";

//코드 스플리팅
const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Channel = loadable(() => import('@pages/Channel'));

const App = () => {
  return <Switch>
    <Redirect exact path="/" to ="/login" />
    <Route path="/login" component={LogIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/workspace" component={Channel} />
  </Switch>
};

export default App;
