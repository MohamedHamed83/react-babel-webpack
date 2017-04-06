import React from 'react';
import {render} from 'react-dom';
import {SkiDayCount} from './components/skiDayCount';
import {App} from './components/app';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Whoops404} from './components/Whoops404';
import './scss/style.scss';

render(
  <Router >
  <Switch>
    <Route exact path="/" component={App}/>
    <Route path="/list-days" component={App}></Route>
    <Route path="/list-days/:filter" component={App}/>
    <Route path="/add-day" component={App}/>
  </Switch>
</Router>, document.getElementById('react-container'));
