import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../header/header';
import Homepage from '../homepage/homepage';
import Bayes from '../bayes/bayes';
import Gurviz from '../gurviz/gurviz';
import Results from '../results/results'

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
                    <Route path='/results' component={Results} exact />

                </div>
            </Router>
        );
    }
}