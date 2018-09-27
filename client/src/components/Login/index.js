import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comand: true
        };
    }

    entry(e) {
        e.preventDefault();
        // this.setState({windowHeight: document.documentElement.clientHeight});
    }

    regOrAunt() {
        let title = document.getElementById('title-form');
        let form = document.getElementById('form');
        title.classList.add('is-open');
        this.setState({comand: !this.state.comand});
        this.state.comand ? form.classList.add('registrarion') : form.classList.remove('registrarion');
        setTimeout(()=>{title.classList.remove('is-open')},1000)
    }

    registration(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className='fon'>
                <div className='overlay'>
                    <form id='form' className='form-aunt'>
                        <div id='title-form' className='title-form loading-button'>
                            <Link to='/'  className='btn-close' title='Закрыть форму заказа'/>
                            {this.state.comand ? 'Авторизация' : 'Регистрация'}
                        </div>
                        <div className='body-form'>
                            <input type='text' placeholder='Логин'/>
                            <input type='email' className='inp-reg' placeholder='email'/>
                            <input type='password' placeholder='Пароль'/>
                            <input type='password' className='inp-reg' placeholder='Повторите пароль'/>
                            <p className="login-submit">
                                <button onClick={this.entry} className="login-button">Войти</button>
                            </p>
                            <div className='text-form'>
                                <div>
                                    <div onClick={this.regOrAunt.bind(this)} className='text'>{this.state.comand ? 'Регистрация' : 'Авторизация'}</div>
                                    <div className='text'>Забыли пароль?</div>
                                </div>
                                {!this.state.comand ? <button onClick={this.registration.bind(this)} className='reg-btn inp-reg'>Подтвердить</button> : null}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}