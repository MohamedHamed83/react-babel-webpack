import React, { Component } from 'react';

class App extends Component {
  static displayName = 'something else'
  static defaultProps = {
    importantArray: [1, 2, 3]
  }
  // if you want to pass props to component from outside
  constructor(props) {
    super(props);
    //on way to set initial state
    this.state = {
      anotherWayToSetState: ''
    };
    // if not using arrow function pass the component object to the function
    this.oneFunction = this.oneFunction.bind(this);
  }
  // // another way to set initial state
  state ={
    ourInitialState:'yallow'
  };
  oneFunction() {
    console.log('oneFunction');
    console.log(this.props);
  }
  useArrows = () => {
    console.log('useArrows works without binding');
    console.log(this.props);
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <button onClick={this.oneFunction}>One function</button>
        <button onClick={this.useArrows}>Arrow function</button>

      </div>
    );
  }
}

function myTestWrapper(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <div>
          <WrappedComponent />
        </div>
      );
    }
  };
}

App = myTestWrapper(App);
// app.defaultProps= {
//   importantArray:[4,5,6]
// }
// App.displayName = 'haveFunn';
export default App;
