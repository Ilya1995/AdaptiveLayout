import React, { Component } from 'react'
import './styles.css'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    entry(e) {
        e.preventDefault();
        // this.setState({windowHeight: document.documentElement.clientHeight});
    }

    render() {
        return (
            <div style={{marginBottom: '1000px'}}>
                <div className='overlay'>
                    <form className='form-aunt'>
                        <div className='title-form'>Авторизация</div>
                        <div className='body-form'>
                            <input type='text' placeholder='Логин'/>
                            <input type='password' placeholder='Пароль'/>
                            <p className="login-submit">
                                <button onClick={this.entry} className="login-button">Войти</button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}