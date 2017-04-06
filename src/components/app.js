import {Component} from 'react';
import {SkiDayList} from './skiDayList';
import {SkiDayCount} from './skiDayCount';
import {AddDayForm} from './addDayForm';
import {Menu} from './menu';
export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allSkiDays: [
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
            ]
        };
    }
    constDays(filter) {
        return this
            .state
            .allSkiDays
            .filter((day) => (filter)
                ? day[filter]
                : day)
            .length;
    }
    render() {
        return (
            <div className="app">
                <Menu></Menu>
                {(this.props.location.pathname === '/')
                    ? <SkiDayCount
                            total={this.constDays()}
                            powder={this.constDays('powder')}
                            backcountry={this.constDays('backcountry')}
                            goal={100}/>
                    : (this.props.location.pathname === '/add-day')
                        ? <AddDayForm/>
                        : <SkiDayList
                            days={this.state.allSkiDays}
                            filteredDays={this.props.params.filter}/>
}

            </div>
        );
    }
};
