import React, { Component } from 'react';
import loggify from './loggify';

class App extends Component {
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
        Hello
      </div>
    );
  }
}

App = loggify(App);

export default App;
