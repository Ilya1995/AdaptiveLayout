import React, { Component } from 'react'
import './styles.css'
import _ from 'underscore'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            windowHeight: 500,
            numberCurrentBlock: 1
        };
        this.onWheel = this.onWheel.bind(this);
        this.onResize = this.onResize.bind(this);
    }

    onWheel(e) {
        let elem = document.getElementById('main');
        let blocks = elem.querySelectorAll('.promo-page-multiple-block');
        let kray = blocks[blocks.length-1].dataset.selector;
        e = e || window.event;
        let delta = e.deltaY;
        let numberCurrentBlock = 1;
        if (delta > 0) {
            if (kray != this.state.numberCurrentBlock) {
                numberCurrentBlock = +this.state.numberCurrentBlock + 1;
                this.setState({numberCurrentBlock: numberCurrentBlock});
            }
        } else {
            if (this.state.numberCurrentBlock > 1) {
                numberCurrentBlock = +this.state.numberCurrentBlock - 1;
                this.setState({numberCurrentBlock: numberCurrentBlock});
            }
        }
        let page = 'promo-page-' + numberCurrentBlock;
        const element = document.getElementById(page);
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        window.scrollTo({ top: absoluteElementTop-60, left: 0, behavior: 'smooth' });
        document.getElementById('fp'+ numberCurrentBlock)['checked'] = true;
        let fpNav = document.getElementById('fp-nav');
        fpNav.style.opacity = '0';
        setTimeout(()=> fpNav.style.opacity = '1', 500);
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }

    onResize() {
        this.setState({windowHeight: document.documentElement.clientHeight});
        this.transitionPage(1);
    }

    componentWillMount() {
        this.setState({windowHeight: document.documentElement.clientHeight});
    }

    componentDidMount() {
        let that = this;
        let elem = document.getElementById('main');
        let blocks = elem.querySelectorAll('.promo-page-multiple-block');
        let numberCurrentBlock = 1;
        _.each(blocks, (block) => {
            block.getBoundingClientRect().top - 60 <= 0 ? numberCurrentBlock = block.dataset.selector : null;
        });
        this.setState({numberCurrentBlock: numberCurrentBlock});
        document.getElementById('fp'+ numberCurrentBlock)['checked'] = true;
        if (elem.addEventListener) {
            if ('onwheel' in document) {//подписываемся на мышиный скролл
                // IE9+, FF17+, Ch31+
                elem.addEventListener("wheel", that.onWheel);
            } else if ('onmousewheel' in document) {
                // устаревший вариант события
                elem.addEventListener("mousewheel", that.onWheel);
            } else {
                // Firefox < 17
                elem.addEventListener("MozMousePixelScroll", that.onWheel);
            }
        } else { // IE8-
            elem.attachEvent("onmousewheel", that.onWheel);
        }

        window.addEventListener("resize", that.onResize);//подписываемся на изменение размера окна
    }

    componentWillUnmount() {
        let that = this;
        let elem = document.getElementById('main');
        if (elem.addEventListener) {
            if ('onwheel' in document) {
                // IE9+, FF17+, Ch31+
                elem.removeEventListener('wheel', that.onWheel);
            } else if ('onmousewheel' in document) {
                // устаревший вариант события
                elem.removeEventListener('mousewheel', that.onWheel);
            } else {
                // Firefox < 17
                elem.removeEventListener('MozMousePixelScroll', that.onWheel);
            }
        } else { // IE8-
            elem.detachEvent("onmousewheel", that.onWheel);
        }
        window.removeEventListener('resize', that.onResize);
    }

    transitionPage(e) {
        let page = 'promo-page-' + e;
        const element = document.getElementById(page);
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        window.scrollTo({ top: absoluteElementTop-60, left: 0, behavior: 'smooth' });
        let fpNav = document.getElementById('fp-nav');
        fpNav.style.opacity = '0';
        setTimeout(()=> fpNav.style.opacity = '1', 500);
        document.getElementById('fp'+e)['checked'] = true;
        this.setState({numberCurrentBlock: e});
    }

    render() {
        console.log(33);
        return (
            <div id="promo-page-main" className='promo-page-main'>
                <div id="promo-page-container" className="promo-page-container promo-page-multiple-container" data-selector="promo-page-container">
                    <div id="promo-page-1" data-selector="1" style={{'height': this.state.windowHeight-60}} className='promo-page-block-one promo-page-multiple-block'>

                        <div className={this.state.numberCurrentBlock == 1 ? 'title animated zoomIn':'title'}>Выбери лучшую машину по версии АВТОВАЗ</div>

                        <div className="slider">
                            <input defaultChecked type="radio" name="slider" id="switch1"/>
                            <input type="radio" name="slider" id="switch2"/>
                            <input type="radio" name="slider" id="switch3"/>
                            <input type="radio" name="slider" id="switch4"/>
                            <input type="radio" name="slider" id="switch5"/>
                            <div className="slides">
                                <div className="image">
                                    <img src="/src/components/Home/img/evo.jpeg"/>
                                    <img src="/src/components/Home/img/rx7.jpeg"/>
                                    <img src="/src/components/Home/img/bmv.jpeg"/>
                                    <img src="/src/components/Home/img/9.jpeg"/>
                                    <img src="/src/components/Home/img/wrx.jpeg"/>
                                </div>
                            </div>
                            <div className="controls">
                                <label htmlFor="switch1"/>
                                <label htmlFor="switch2"/>
                                <label htmlFor="switch3"/>
                                <label htmlFor="switch4"/>
                                <label htmlFor="switch5"/>
                            </div>
                            <div className="active">
                                <label htmlFor="switch1"/>
                                <label htmlFor="switch2"/>
                                <label htmlFor="switch3"/>
                                <label htmlFor="switch4"/>
                                <label htmlFor="switch5"/>
                            </div>
                        </div>
                    </div>


                    <div id="promo-page-2" data-selector="2" style={{'height': this.state.windowHeight-60}} className='promo-page-block-two promo-page-multiple-block'>

                        <div className="container-tariffs">
                            <div className={this.state.numberCurrentBlock == 2 ? 'title animated zoomIn':'title'} style={{animationDelay: '100ms'}}>Тарифы</div>

                            <div className="tariffs">
                                <div className="tariff">
                                    <div className="icon red"/>
                                    <h3 className="red">Старт</h3>
                                    <ul className="options">
                                        <li>20 users</li>
                                        <li>50 gb storage</li>
                                        <li>unlimited data transfer</li>
                                    </ul>
                                    <div className="price-box">
                                        <div className="price red">$199</div>
                                        <div className="price-label">per month</div>
                                    </div>
                                    <a className="btn-tariff btn-red">Buy Now</a>
                                </div>
                                <div className="tariff"></div>
                                <div className="tariff"></div>
                            </div>
                        </div>

                    </div>
                    <div id="promo-page-3" data-selector="3" style={{'height': this.state.windowHeight-60}} className='promo-page-block-three promo-page-multiple-block'>

                    </div>
                    {/*У footer data-selector="4"*/}
                </div>
                <div className="back-to-top-wrapper">
                    <a className="back-to-top" title="Back to top" onClick={this.transitionPage.bind(this,'1')}>
                        <img src="/src/components/Home/img/back.png"/>
                    </a>
                </div>
                <div id="fp-nav" className="right fp-prev fp-next">
                    <input defaultChecked type="radio" name="fp-nav-right" id="fp1"/>
                    <input type="radio" name="fp-nav-right" id="fp2"/>
                    <input type="radio" name="fp-nav-right" id="fp3"/>
                    <input type="radio" name="fp-nav-right" id="fp4"/>
                    <div className="active-fp-nav">
                        <label onClick={this.transitionPage.bind(this,'1')} htmlFor="fp1"/>
                        <label onClick={this.transitionPage.bind(this,'2')} htmlFor="fp2"/>
                        <label onClick={this.transitionPage.bind(this,'3')} htmlFor="fp3"/>
                        <label onClick={this.transitionPage.bind(this,'4')} htmlFor="fp4"/>
                    </div>
                </div>
            </div>
        )
    }
}