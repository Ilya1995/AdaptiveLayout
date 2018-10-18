import 'babel-polyfill'
import React, {Component} from 'react'
import App from '../../containers/App'
import Login from '../../containers/Login'
import Home from '../Home'
import NotFound from '../NotFound'
import {Route, Switch} from 'react-router-dom'
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <App>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/login' component={Login} />
                            <Route component={NotFound}/>
                        </Switch>
                    </App>
                </Switch>
                <NotificationContainer/>
            </div>
        )
    }
}