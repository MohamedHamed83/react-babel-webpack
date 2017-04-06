import {PropTypes} from 'react';
import Terrain from 'react-icons/lib/md/terrain';
import SnowFlake from 'react-icons/lib/ti/weather-snow';
import Calendar from 'react-icons/lib/fa/calendar';
import '../scss/style.scss';

const precentTodecimal = (decimal) => {
  return ((decimal * 100) + '%');
};
const calcGoalProgress = (total, goal) => {
  return precentTodecimal(total / goal);
};
export const SkiDayCount = ({total, powder, backcountry, goal}) => (
  <div className="ski-day-count">
    <div className="total-days">
      <span>{total}</span>
      <Calendar></Calendar>
      <span>days</span>
    </div>
    <div className="power-days">
      <span>{powder}</span>
      <SnowFlake></SnowFlake>
      <span>days</span>
    </div>
    <div className="backcountry-days">
      <span>{backcountry}</span>
      <Terrain></Terrain>
      <span>days</span>
    </div>
    <div>
      <span>{calcGoalProgress(total, goal)}</span>
    </div>
  </div>

);
SkiDayCount.defaultProps = {
  total: 50,
  powder: 50,
  backcountry: 15,
  goal: 75
};
SkiDayCount.propTypes = {
  total: PropTypes.number,
  powder: PropTypes.number,
  backcountry: PropTypes.number
};
