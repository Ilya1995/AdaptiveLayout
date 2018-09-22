import React, { Component } from 'react'
import './styles.css'

export default class Loading extends Component {
    render() {
        return (
            <div className='overlay'>
                <div className='preloader'>
                    <img src='/src/components/Preloader/kot.gif' alt='image' width='200px' height='200px;'/>
                </div>
            </div>
        )
    }
}