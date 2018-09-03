import React, { Component } from 'react'
import moment from 'moment'
moment.locale('ru');

export default class Date extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ''
        };
        this.intervalID = null;
    }

    componentDidMount() {
        let that = this;
        setInterval(() => {
            let date = moment().format('LTS') + '\u00A0\u00A0\u00A0' + moment().format('LL');
            that.intervalID = that.setState({date: date});
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return (
            <div>
                <div className='date'>{this.state.date}</div>
            </div>
        )
    }
}
