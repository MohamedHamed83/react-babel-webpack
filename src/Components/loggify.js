//logging service
import React, { Component } from 'react';
import styled from 'styled-components';


const LoggerContainer = styled.div`
background-color: lightblue;
border: 2px grooved aquamarine;
width:50%;
border-radius:5px;
`;
const H2=styled.h3`
color: bluevidolet
`;
LoggerContainer.displayName = 'loggerContainer';
H2.displayName = 'H2';
export default function loggify(Wrapped){

  return class extends Component{
    render(){
      return(
        <LoggerContainer>
          <H2>{Wrapped.displayName} is now loggifid</H2>
          <Wrapped {...this.props} />
        </LoggerContainer>
      );
    }
  };
}
