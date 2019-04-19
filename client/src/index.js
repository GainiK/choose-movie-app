import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import Movies from './Movies';
import Search from './Search';
import NotFound from './NotFound';
import NavbarPage from './components/NavbarPage';
import Schedule from './Schedule';
import ScheduleList from './ScheduleList';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import EpisodeSchedule from './components/EpisodeSchedule'
import WatchList from './WatchList'

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import 'font-awesome/css/font-awesome.min.css';

const routing = (

    <Router>
       <div>
        <Route path = "/" component={NavbarPage} />
       
        <Switch>
            <Route exact path = "/" component = {App} />
            <Route path = "/movie/:id" component = {Movies} />
            <Route path = "/search/:query" component = {Search} />
            <Route path = "/schedule" component = {Schedule} />
            <Route path = "/watchlist" component = {WatchList} />
            <Route path = "/episodes_schedule/:id" component = {EpisodeSchedule} />
            <Route component = {NotFound} />
        </Switch>
        
        </div> 
      </Router>
  )


  
ReactDOM.render(routing,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
