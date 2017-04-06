import { navLink } from 'react-router';
import HomeIcon from 'react-icons/lib/fa/home';
import AddDayIcon from 'react-icons/lib/fa/calendar-plus-o';
import ListDaysIcon from 'react-icons/lib/fa/table';

export const Menu = () => 
	<nav className="menu">
		<navLink to="/" >
			<HomeIcon />
		</navLink>
		<navLink to="/add-day" >
			<AddDayIcon />
		</navLink>
		<navLink to="/list-days" >
			<ListDaysIcon />
		</navLink>
	</nav>;