import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

export default class NotFound extends Component {
    render() {
        return (
            <div className='not-found'>
                <div  className='return'>Страница не найдена. Вернуться на <Link to='/'>главную</Link>?</div>
                <div>
                    <p id="error">E<span>r</span>ror</p>
                    <p id="code">4<span>0</span><span>4</span></p>
                </div>
            </div>
        )
    }
}