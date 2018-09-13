import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'
import Footer from '../../components/Footer'

export default class App extends Component {
    render() {
        return (
            <div id="main" className='container'>
                <Header />
                {/*<div>*/}
                    {/*<div style={{background: "url('https://sprinthost.ru/img/bg-header-main.svg') center top no-repeat"}}>*/}
                        {/*<div>App</div>*/}
                        {/*<ul style={{marginTop: '830px'}}>*/}
                            {/*<li><Link to='/admin'>Admin</Link></li>*/}
                            {/*<li><Link to='/genre'>Genre</Link></li>*/}
                            {/*<li><Link to='/asdsc'>Хулио</Link></li>*/}
                            {/*<li><Link to='/genre/ge'>asdds</Link></li>*/}
                        {/*</ul>*/}
                    {/*</div>*/}
                    {/**/}
                {/*</div>*/}
                {this.props.children}
                <Footer />
            </div>
        )
    }
}