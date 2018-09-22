import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/UserActions'
import Date from '../../components/Date'
import './styles.css'


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.scrollNavParams = {
            NavElemTop: {},
            NavElem: {},
            NavSourceBottom: {},
            pageYOffset: 0
        };
        this.scrollNavigation = this.scrollNavigation.bind(this);
    }

    scrollNavigation() {
        if (this.scrollNavParams.pageYOffset > window.pageYOffset) {
            this.scrollNavParams.NavElemTop.classList.remove('scroll_down');
            this.scrollNavParams.NavElem.classList.remove('scroll_up');
        } else {
            this.scrollNavParams.NavElemTop.classList.add('scroll_down');
            this.scrollNavParams.NavElem.classList.add('scroll_up');
        }
        this.scrollNavParams.pageYOffset = window.pageYOffset;
    }

    componentDidMount() {
        // this.scrollNavParams.NavElemTop = document.getElementById('navigation-top');
        // this.scrollNavParams.NavElem = document.getElementById('navigation');

        // document.getElementById('navigation-top').classList.add('scroll_down');
        document.getElementById('navigation').classList.add('scroll_up');
        // window.addEventListener('scroll', this.scrollNavigation, true);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollNavigation, true);
    }

    openToggle () {
        document.getElementById('navigation').classList.contains('mobile_open') ?
            document.getElementById('navigation').classList.remove('mobile_open') :
            document.getElementById('navigation').classList.add('mobile_open');
    }

    render() {
        console.log(this.props.userInfo);
        // const { isAuth, name } = this.props.userInfo;

        const onLogout = () => {
            this.context.router.history.push('/admin');
        };

        return (
            <div className='header'>
                <div id='navigation' className='navigation'>
                    <div className='date'><Date/></div>
                    <div className='nav-menu'>
                        <div onClick={this.openToggle} className='nav_toggle'>

                        </div>
                        <ul className='main-nav-list'>
                            <li>
                                <a>Why Swagger</a>
                                <div className='dropdown'>
                                    <ul>
                                        <li>
                                            <a className='main-nav-icon api-design'>API Design</a>
                                        </li>
                                        <li>
                                            <a className='main-nav-icon api-development'>API Development</a>
                                        </li>
                                        <li>
                                            <a className='main-nav-icon api-documentation'>API Documentation</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <a>Ehdser</a>
                                <div className='dropdown'>
                                    <ul>
                                        <li>
                                            <a className='main-nav-icon api-design'>Design</a>
                                        </li>
                                        <li>
                                            <a className='main-nav-icon api-development'>Lopment</a>
                                        </li>
                                        <li>
                                            <a className='main-nav-icon api-documentation'>Ation</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <ul className="navigation-ul">
                        <li>
                            <Link to='/login' className='navigation-li'>
                                <img src='./src/containers/Header/img/man.svg' alt='man' width='21px' height='21px;'/>
                                <span>Личный кабинет</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/' className='navigation-li'>
                                <img src='./src/containers/Header/img/help.svg' alt='help' width='21px' height='21px;'/>
                                <span>Помощь</span>
                            </Link>
                        </li>
                    </ul>
                </div>
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