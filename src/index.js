import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import App from './App';
import Map from './scenes/Map';
import './index.css';

ReactDOM.render(
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/map">Map</Link></li>
      </ul>
      <Route exact path="/" component={App} />
      <Route exact path="/map" component={Map} />
    </div>
  </Router>,
  document.getElementById('root')
);
