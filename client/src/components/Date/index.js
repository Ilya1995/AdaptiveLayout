import React, { Component } from 'react'
import moment from 'moment'
import './styles.css'
moment.locale('ru');

export default class Date extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            day: '',
            time: ''
        };
        this.intervalID = null;
    }

    componentDidMount() {
        let that = this;
        that.setState({
            date: moment().format('LL').substring(0, moment().format('LL').length-8),
            day: moment().format('dddd'),
            time: moment().format('LT')
        });
        this.intervalID = setInterval(() => {
           that.setState({
               date: moment().format('LL').substring(0, moment().format('LL').length-8),
               day: moment().format('dddd'),
               time: moment().format('LT')
           });
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return (
            <div className='form-date'>
                <div className='clock'>
                    <div>{this.state.date}</div>
                    <div>{this.state.day}</div>
                    <div className='time'>{this.state.time}</div>
                </div>
            </div>
        )
    }
}
