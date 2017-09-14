import React from 'react';
import { render } from 'react-dom';
import createReactClass from 'create-react-class';

//statless component
const App = function(props){
 return ( <div>
      <h1>{props.text}</h1>
      <p> {props.children}</p>
    </div>
  );
};

render(
  <div>
  <App text="textting component">
  texting chlidern items 1</App>
  <App text="textting component 2">
  texting chlidern items 2</App>
  <App text="textting component 3 ">
  texting chlidern items 3</App>
  <App text="textting component4 ">
  texting chlidern items 4</App>
  </div>,
  document.getElementById('react-container')
);
