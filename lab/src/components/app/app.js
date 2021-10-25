import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../header';
import Homepage from '../homepage';
import Bayes from '../bayes';
import Gurviz from '../gurviz';

import './app.css';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />

                    <Route path='/' component={Homepage} exact />
                    <Route path='/bayes' component={Bayes} exact />
                    <Route path='/gurviz' component={Gurviz} exact />

                </div>
            </Router>
        );
    }
}