import 'babel-polyfill'
import React, {Component} from 'react'
import App from '../../containers/App'
import Admin from '../Admin'
import Login from '../Login'
import Home from '../Home'
import NotFound from '../NotFound'
import {Route, Switch} from 'react-router-dom'

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <App>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/admin' component={Admin} />
                            <Route component={NotFound}/>
                        </Switch>
                    </App>
                </Switch>
            </div>
        )
    }
}