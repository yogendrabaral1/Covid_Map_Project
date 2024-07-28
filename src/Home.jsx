import React, { Component } from 'react';
import App from './App';
import Navbar from './NavComponent/Navbar';
import USAMap from './USAMapComponent/USAMap';
import TableView from './TableViewComponent/TableView';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={App} />
                    <Route path='/USA' component={USAMap} />
                    <Route path='/tableview' component={TableView} />
                </Switch>
            </Router>
        );
    }
}

export default Home;