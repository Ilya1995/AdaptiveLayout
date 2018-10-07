import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/UserActions";
import { Link } from 'react-router-dom'
import { LocalForm, Control, Errors } from 'react-redux-form';
import { NotificationManager } from 'react-notifications';
import Loading from "../../components/Preloader";
import './styles.css'
import user from "../../reducers/user";

const isRequired = (val) => val && val.length > 0;
const minLength = (num, val) => !val || val && val.length >= num;
const validEmail = (val) => {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return !val || !(reg.test(val) === false)
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comand: true
        };
    }

    regOrAunt() {
        let title = document.getElementById('title-form');
        let form = document.getElementById('form');
        title.classList.add('is-open');
        this.setState({comand: !this.state.comand});
        this.state.comand ? form.classList.add('registrarion') : form.classList.remove('registrarion');
        setTimeout(()=>{title.classList.remove('is-open')},1000)
    }

    handleSubmit(val) {
        if (!(isRequired(val.login) && minLength(5 ,val.login))) {
            NotificationManager.error('Заполни логин', 'Ошибка', 5000);
            return;
        }
        if (!(isRequired(val.password) && minLength(8 ,val.password))) {
            NotificationManager.error('Заполни пароль', 'Ошибка', 5000);
            return;
        }

        if (!this.state.comand) {
            if (!(isRequired(val.email) && validEmail(val.email))) {
                NotificationManager.error('Некорректный email', 'Ошибка', 5000);
                return;
            }
            if (!(isRequired(val.confirmPassword) && minLength(8 ,val.confirmPassword))) {
                NotificationManager.error('Заполни пароль', 'Ошибка', 5000);
                return;
            }
            if (val.password !== val.confirmPassword) {
                NotificationManager.error('Пароли не совпадают', 'Ошибка', 5000);
                return;
            }
            this.props.userActions.registration(val);
        } else {
            this.props.userActions.authentication(val);
        }

    }

    render() {
        const { preloader } = this.props.userInfo;
        console.log(preloader);
        return (
            <div className='fon'>
                <div className='overlay'>
                    <LocalForm id='form' className='form-aunt'
                               model="user"
                               onSubmit={this.handleSubmit.bind(this)}>
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
                                defaultValue='1234567'
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
                                defaultValue='123@45.ru'
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
                                defaultValue='123@45.6sss7'
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
                                defaultValue='123@45.6sss7'
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
                                <Control.button model="user" className='login-button'>
                                    Войти
                                </Control.button>
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
                {preloader ? <Loading /> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)