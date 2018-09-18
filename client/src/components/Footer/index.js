import React, { Component } from 'react'
import './styles.css'

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="promo-page-4" className='footer promo-page-multiple-block' data-selector="4">
                <div className='footer-container'>
                    <div className="col-12 col-md-4">Copyright © 2018 Ilya Kovalev</div>
                    <div className="col-12 col-md-4">Privacy | Terms of Use | Site Map</div>
                    <div className="col-12 col-md-4">
                        <a href='https://vk.com/kaizerrus' className='social-vk'/>
                        <a className='social-fb'/>
                        <a className='social-tw'/>
                        <a href='https://www.youtube.com/channel/UCBnJJcpyglvK7IDdNbCFsOQ' className='social-ut'/>
                    </div>
                </div>
            </div>
        )
    }
}
