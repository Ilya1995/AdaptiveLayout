import 'babel-polyfill'
import React, {Component} from 'react'
import App from '../../containers/App'
import Admin from '../Admin'
import Home from '../Home'
import NotFound from '../NotFound'
import {Route, Switch} from 'react-router-dom'


export default class Routes extends Component {
    render() {
        return (
            <div>
                <App>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/admin' component={Admin} />
                        <Route component={NotFound}/>
                    </Switch>
                </App>
            </div>
        )
    }
}