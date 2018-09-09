import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Loadable from 'react-loadable';
import store from "../../store";

import styled from 'styled-components';
import { Spinner } from '../../styledComponents/common';
import 'reset-css';

const loadableComponent = (component = "Home") => {
  return Loadable({
      loader: () => import(`../../container/${component}` /* webpackChunkName: "[request]" */),
      loading: () => <div style={{textAlign: 'center'}}><Spinner/></div>
  });
}


const Body = styled.div`
  box-sizing: border-box;
  max-width: 960px;
  padding: 0 20px;
  margin: 20px auto;
  a {
    color: inherit;
    text-decoration: none;
  }
  .canvasjs-chart-credit {
    display: none;
  }
`

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Body>
          <Router>
            <Switch>
              <Route exact path='/' component={loadableComponent('PairList')} />
              <Route path='/:pair' component={loadableComponent('TradingPair')} />
            </Switch>
          </Router>
        </Body>
      </Provider>
    );
  }
}

export default App;
