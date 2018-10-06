import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { LocalForm, Control, Errors } from 'react-redux-form';
import { NotificationManager } from 'react-notifications';
import './styles.css'

const isRequired = (val) => val && val.length > 0;
const minLength = (num, val) => !val || val && val.length >= num;
const validEmail = (val) => {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return !val || !(reg.test(val) === false)
};

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comand: true
        };
    }

    authorization(e) {
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

    registration(val) {
        console.log(val);
        NotificationManager.error('zxd', 'Пополнение баланса', 25000);
    }

    render() {
        return (
            <div className='fon'>
                <div className='overlay'>
                    <LocalForm id='form' className='form-aunt'
                               model="user"
                               onSubmit={this.registration}>
                        <div id='title-form' className='title-form loading-button'>
                            <Link to='/'  className='btn-close' title='Закрыть форму заказа'/>
                            {this.state.comand ? 'Авторизация' : 'Регистрация'}
                        </div>
                        <div className='body-form'>

                            <Control.text
                                model="user.login" placeholder='Логин'
                                mapProps={{
                                    className: ({fieldValue}) => fieldValue.touched && !fieldValue.valid &&
                                    !fieldValue.focus && !this.state.comand
                                        ? 'inp-err'
                                        : ''
                                }}
                                validators={{ isRequired, minLength: minLength.bind(this, 5) }}
                            />
                            {!this.state.comand ?
                            <Errors
                                className='error'
                                wrapper="div"
                                show={{ touched: true, focus: false }}
                                model="user.login"
                                messages={{
                                    isRequired: 'Заполни поле. ',
                                    minLength: 'Логин должен содержать более 5 символов. '
                                }}
                            /> : null}

                            <Control.text
                                model="user.email" placeholder='email'
                                mapProps={{
                                    className: ({fieldValue}) => fieldValue.touched && !fieldValue.valid &&
                                    !fieldValue.focus && !this.state.comand
                                        ? 'inp-err inp-reg'
                                        : 'inp-reg'
                                }}
                                validators={{ isRequired, validEmail}}
                            />
                            {!this.state.comand ?
                            <Errors
                                className='error'
                                wrapper="div"
                                show={{ touched: true, focus: false }}
                                model="user.email"
                                messages={{
                                    isRequired: 'Заполни поле. ',
                                    validEmail: 'Некорректный email'
                                }}
                            /> : null}

                            <Control.password
                                model="user.password" placeholder='Пароль'
                                mapProps={{
                                    className: ({fieldValue}) => fieldValue.touched && !fieldValue.valid &&
                                    !fieldValue.focus && !this.state.comand
                                        ? 'inp-err'
                                        : ''
                                }}
                                validators={{ isRequired, minLength: minLength.bind(this, 8) }}
                            />
                            {!this.state.comand ?
                            <Errors
                                className='error'
                                wrapper="div"
                                show={{ touched: true, focus: false }}
                                model="user.password"
                                messages={{
                                    isRequired: 'Заполни поле. ',
                                    minLength: 'Пароль должен содержать больше 8 символов. '
                                }}
                            /> : null}

                            <Control.password
                                model="user.confirmPassword" placeholder='Повторите пароль'
                                mapProps={{
                                    className: ({fieldValue}) => fieldValue.touched && !fieldValue.valid &&
                                    !fieldValue.focus && !this.state.comand
                                        ? 'inp-err inp-reg'
                                        : 'inp-reg'
                                }}
                                validators={{ isRequired, minLength: minLength.bind(this, 8)}}
                            />
                            {!this.state.comand ?
                            <Errors
                                className='error'
                                wrapper="div"
                                show={{ touched: true, focus: false }}
                                model="user.confirmPassword"
                                messages={{
                                    isRequired: 'Заполни поле. ',
                                    minLength: 'Пароль должен содержать больше 8 символов. '
                                }}
                            /> : null}

                            <p className="login-submit">
                                <button onClick={this.authorization} className="login-button">Войти</button>
                            </p>

                            <div className='text-form'>
                                <div>
                                    <div onClick={this.regOrAunt.bind(this)} className='text'>{this.state.comand ? 'Регистрация' : 'Авторизация'}</div>
                                    <div className='text'>Забыли пароль?</div>
                                </div>
                                {!this.state.comand ?
                                    <Control.button model="user" className='reg-btn inp-reg' disabled={{ valid: false }}>
                                        Подтвердить
                                    </Control.button>
                                : null}
                            </div>
                        </div>
                    </LocalForm>
                </div>
            </div>
        )
    }
}