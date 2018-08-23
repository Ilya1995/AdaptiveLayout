import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/UserActions'
import './styles.css';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log(this.props.userInfo);
        //const { isAuth, name } = this.props.userInfo;

        const onLogout = () => {
            this.context.router.history.push('/admin');
        };

        return (
            <div className='header'>
                <div className='logo'>
                    <Link to='/'>
                        <img src='./src/containers/Header/logo.jpg' alt='logo' width='206px' height='101px;'/>
                    </Link>
                </div>
                <br/>
                <div className='aut-reg'>
                    <div>
                        <span><b>Войти</b></span>&nbsp;|&nbsp;
                        <span>Регистрация</span>
                    </div>
                </div>
                <div className='input-serch'>
                    <input type='text' ref='serch' name='serch' placeholder='Название товара'/>
                </div>

                {/*<button onClick={onLogout}>Press</button>*/}
            </div>
        )
    }
}

Header.contextTypes	=	{
    router:	PropTypes.object.isRequired
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Header)