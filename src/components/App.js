import React, { Component } from 'react';
import LinkList from './LinkList';
import CreateLink from './CreateLink';
import Header from './Header';
import Login from './Login';
import Search from './Search';
import { Redirect, Route, Switch } from 'react-router-dom';


const App = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route
            exact
            path="/create"
            component={CreateLink}
          />

          <Route exact path="/login" component={Login} />

        </Switch>
      </div>
    </div>
  );
};

/*
const App = () => (
  <div className="center w85">
    <Header />
    <div className="ph3 pv1 background-gray">
      <Switch>
        <Route
          exact
          path="/"
           render={() => <Redirect to="/new/1" />} 
        />

        <Route
          exact
          path="/create"
          component={CreateLink}
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/search" component={Search} />
      </Switch>
    </div>
  </div>
);
*/
export default App;
