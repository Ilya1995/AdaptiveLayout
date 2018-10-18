import React, { Component } from 'react'
import Header from '../Header'
import Footer from '../../components/Footer'

export default class App extends Component {
    render() {
        return (
            <div id="main" className='container'>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}