import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <Header />
                <h1>App</h1>
                <ul>
                    <li><Link to='/admin'>Admin</Link></li>
                    <li><Link to='/genre'>Genre</Link></li>
                    <li><Link to='/asdsc'>Хулио</Link></li>
                    <li><Link to='/genre/ge'>asdds</Link></li>
                </ul>
                {this.props.children}
                {/*<Footer />*/}
            </div>
        )
    }
}