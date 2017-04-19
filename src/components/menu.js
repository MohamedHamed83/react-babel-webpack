import HomeIcon from 'react-icons/lib/fa/home';
import AddDayIcon from 'react-icons/lib/fa/calendar-plus-o';
import ListDaysIcon from 'react-icons/lib/fa/table';
import App from './app';
import AddDayForm from './addDayForm';
import {NotFound} from './NotFound';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
export const Menu = () => {
  return (
    <Router>
      <div>
        <nav className="menu">
          <NavLink activeClassName="active" to="/">
            <HomeIcon/>
          </NavLink>
          <NavLink activeClassName="active" to="/add-day">
            <AddDayIcon/>
          </NavLink>
          <NavLink activeClassName="active" to="/list-days">
            <ListDaysIcon/>
          </NavLink>
        </nav>
        <hr/>
        <Route exact path="/" component={App}/>
        <Route path="/add-day" component={AddDayForm}/>
        <Route component={NotFound}></Route>
      </div>
    </Router>
  );
};
{/*<Route path = "/list-days" component={AddDayForm} />;*/
}
