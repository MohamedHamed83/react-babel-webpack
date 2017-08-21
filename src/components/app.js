import React, { Component } from 'react';

class App extends Component {
  // static displayName = 'something else'
  // static defaultProps= {
  //   importantArray:[1,2,3]
  // // }
  // if you want to pass props to component from outside
  // constructor(props){
  //   super(props)
  //this.state={
    // anotherWayToSetState:''
  //}
  // }
  state ={
    ourInitialState:'yallow'
  }
  render() {
    console.log(this.state);
    return (
      <h1>
        test
      </h1>
    );
  }
}

function myTestWrapper(WrappedComponent){
  return class extends Component{
    render() {
      return (
        <div style={{ backgroundColor: 'blue' }}>
          <WrappedComponent/>
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
