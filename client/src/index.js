import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Routes from './components/Routes'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const supportsHistory = 'pushState' in window.history;
const store = configureStore();

render(
    <Provider store={store} key="provider">
        <BrowserRouter forceRefresh={!supportsHistory}>
            <Routes/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);