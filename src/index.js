import React from 'react';
import {render} from 'react-dom';
import {SkiDayCount} from './components/skiDayCount';
import {SkiDayList} from './components/skiDayList';
import './scss/style.scss';
//<SkiDayCount total={50} powder={20} backcountry = {10} goal={100} />
const days = [
  {
    resort: 'Wairau Valley',
    date: new Date('1/2/2016'),
    powder: true,
    backcountry: false
  }, {
    resort: 'Devenport',
    date: new Date('12/5/2016'),
    powder: true,
    backcountry: false
  }, {
    resort: 'Takapuna',
    date: new Date('4/5/2016'),
    powder: false,
    backcountry: false
  }, {
    resort: 'Albany',
    date: new Date('5/5/2016'),
    powder: true,
    backcountry: true
  }, {
    resort: 'Horaki',
    date: new Date('4/8/2016'),
    powder: false,
    backcountry: true
  }
];

render(
  <SkiDayList days={days}/>, document.getElementById('react-container'));
