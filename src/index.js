import React from 'react';
import {render} from 'react-dom';
import {SkiDayCount} from './components/skiDayCount';
import {App} from './components/app';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Whoops404} from './components/Whoops404';
import './scss/style.scss';

render(
  <Router >
  <Route exact path="/" component={App}/>
</Router>, document.getElementById('react-container'));
