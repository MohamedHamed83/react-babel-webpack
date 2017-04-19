import React from 'react';
import {render} from 'react-dom';
import {SkiDayCount} from './components/skiDayCount';
import {Menu} from './components/menu';
import './scss/style.scss';

render(
  <Menu/>, document.getElementById('react-container'));
