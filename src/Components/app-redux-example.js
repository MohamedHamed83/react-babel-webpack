import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const low = ((state = 0, action) => {
  if (action.type === 'UP') {
    return state + 1;
  }
  return state;
});

const high = ((state = 9, action) => {
  if (action.type === 'DOWN') {
    return state - 1;
  }
  return state;
});

const Basement = (props) => {
  const high = props.high;
  return (
    <div>basement ... {high} <button onClick={props.down}>Down</button></div>
  );
};

const Middle = () => {
  return (
    <div>middle! <XBasement /></div>
  );
};

const TopLevel = (props) => {
  const low = props.low;
  return (
    <div>top {low}
      <button onClick={props.up}>up</button>
      <Middle />
    </div>
  );
};

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q' changeMonitorKey='ctrl-m'>
    <LogMonitor />
    <SliderMonitor />
  </DockMonitor>
);

const mapLowDispatchToProps = (dispatch) => { return { up: () => dispatch({ type: 'UP' }) }; };
const mapHighDispatchToProps = (dispatch) => { return { down: () => dispatch({ type: 'DOWN' }) }; };
const XBasement = connect(state => { return { high: state.high }; }, mapHighDispatchToProps)(Basement);
const XTopLevel = connect(state => { return { low: state.low }; }, mapLowDispatchToProps)(TopLevel);

class App extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <XTopLevel />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

const finalCreateStore = compose(DevTools.instrument())(createStore);

function configureStore(initialState) {
  return finalCreateStore(combineReducers({ low: low, high: high }));
}

render((
  <App store={configureStore()} />
), document.getElementById('react-container'));
