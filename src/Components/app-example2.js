import React, { Component } from 'react';
import loggify from './loggify';

class App extends Component {
  state={
    data:'no data yet'
  }
  fetchData = () => {
    console.log('going to fetch data');
    setTimeout(() => {
      console.log('data recived');
      this.setState({
        data: Math.random()
      });
    }, 1500);
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {

    return (
      <div>
        Hello<br/>
        {this.state.data}
      </div>
    );
  }
}

App = loggify(App);

export default App;
