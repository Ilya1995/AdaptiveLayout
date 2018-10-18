import React, { Component } from 'react'
import './styles.css'

export default class Price extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div className="container-tariffs">
                <div className={this.props.animate ? 'title animated zoomIn':'title'}>Тарифы</div>

                <div className="tariffs">
                    <div className={this.props.animate ? 'tariff animated fadeInDown':'tariff'}>
                        <div className="icon red"/>
                        <h3 className="red">Старт</h3>
                        <ul className="options">
                            <li>20 users</li>
                            <li>unlimited data transfer</li>
                        </ul>
                        <div className="price-box">
                            <div className="price red">$199</div>
                            <div className="price-label">per month</div>
                        </div>
                        <a className={this.props.animate ? 'btn-tariff btn-red animated zoomIn':'btn-tariff btn-red'}
                           style={{animationDelay: '500ms'}}>
                            Buy Now
                        </a>
                    </div>
                    <div className={this.props.animate ? 'tariff animated fadeInUp':'tariff'}>
                        <div className="icon yellow"/>
                        <h3 className="yellow">Оптимальный</h3>
                        <ul className="options">
                            <li>30 users</li>
                            <li>unlimited data transfer</li>
                        </ul>
                        <div className="price-box">
                            <div className="price yellow">$299</div>
                            <div className="price-label">per month</div>
                        </div>
                        <a className={this.props.animate ? 'btn-tariff btn-yellow animated zoomIn':'btn-tariff btn-yellow'}
                           style={{animationDelay: '500ms'}}>
                            Buy Now
                        </a>
                    </div>
                    <div className={this.props.animate ? 'tariff animated fadeInDown':'tariff'}>
                        <div className="icon green"/>
                        <h3 className="green">Лакшери</h3>
                        <ul className="options">
                            <li>40 users</li>
                            <li>unlimited data transfer</li>
                        </ul>
                        <div className="price-box">
                            <div className="price green">$399</div>
                            <div className="price-label">per month</div>
                        </div>
                        <a className={this.props.animate ? 'btn-tariff btn-green animated zoomIn':'btn-tariff btn-green'}
                           style={{animationDelay: '500ms'}}>
                            Buy Now
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
