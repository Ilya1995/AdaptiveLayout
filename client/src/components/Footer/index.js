import React, { Component } from 'react'
import './styles.css'

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='footer'>
                <table className='footer-container'>
                    <tbody>
                        <tr>
                            <td style={{width: '33%', textAlign: 'left'}}>Copyright © 2018 Ilya Kovalev</td>
                            <td style={{width: '33%', textAlign: 'center'}}>Privacy | Terms of Use | Site Map</td>
                            <td style={{width: '33%', textAlign: 'right'}}>
                                <a className='social-vk'/>
                                <a className='social-fb'/>
                                <a className='social-tw'/>
                                <a className='social-ut'/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
