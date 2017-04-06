import Terrain from 'react-icons/lib/md/terrain';
import SnowFlake from 'react-icons/lib/ti/weather-snow';
import Calendar from 'react-icons/lib/fa/calendar';
import {SkiDayRow} from './skiDayRow';
import {PropTypes} from 'react';
import {Link} from 'react-router-dom';
export const SkiDayList = ({days, filter}) => {
  const filteredDays = (!filter || !filter.match(/powder|backcountry/))
    ? days
    : days.filter(day => day[filter]);
  return (
    <div className="ski-day-list">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Resort</th>
            <th>Powder</th>
            <th>Backcountry</th>
          </tr>
          <tr>
            <td colSpan={4}>
              <Link to="/list-day">All Days</Link>
              <Link to="/list-day/powder">Powder Days</Link>
              <Link to="/list-day/Backcountry">Backcountry Days</Link>
            </td>
          </tr>
        </thead>
        <tbody>
          {filteredDays.map((day, i) => <SkiDayRow key={i} {...day}/>)}
        </tbody>
      </table>
    </div>
  );
};

SkiDayList.propTypes = {
  days: (props) => {
    if (!Array.isArray(props.days)) {
      return new Error('days must be an array');
    } else if (!props.days.length) {
      return new Error('days must have at least one record');
    } else {
      return null;
    }
  }
};
