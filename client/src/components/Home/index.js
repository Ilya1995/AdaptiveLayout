import React, { Component } from 'react'
import './styles.css'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            windowHeight: 500
        };
        this.numberCurrentBlock  = 1;
        this.onWheel = this.onWheel.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    onWheel(e) {
        let elem = document.getElementById('main');
        let blocks = elem.querySelectorAll('.promo-page-multiple-block');
        let kray = blocks[blocks.length-1].dataset.selector;
        e = e || window.event;
        let delta = e.deltaY;
        if (delta > 0) {
            if (kray != this.numberCurrentBlock) {
                this.numberCurrentBlock++;
            }
        } else {
            if (this.numberCurrentBlock > 1) {
                this.numberCurrentBlock--;
            }
        }
        let page = 'promo-page-' + this.numberCurrentBlock;
        const element = document.getElementById(page);
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        window.scrollTo({ top: absoluteElementTop-60, left: 0, behavior: 'smooth' });
        document.getElementById('fp'+ this.numberCurrentBlock).checked = true;
        let fpNav = document.getElementById('fp-nav');
        fpNav.style.opacity = 0;
        setTimeout(()=> fpNav.style.opacity = 1, 500);
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }

    onResize() {
        this.setState({windowHeight: document.documentElement.clientHeight});
    }

    onScroll() {
        let elem = document.getElementById('main');
        let blocks = elem.querySelectorAll('.promo-page-multiple-block');
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].getBoundingClientRect().top - 60 <= 0) {
                this.numberCurrentBlock = blocks[i].dataset.selector;
            }
        }
    }

    componentWillMount() {
        this.setState({windowHeight: document.documentElement.clientHeight});
    }

    componentDidMount() {
        let that = this;
        let elem = document.getElementById('main');
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

        window.addEventListener("scroll", that.onScroll);//подписываемся на каждый скролл
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
        window.removeEventListener('scroll', that.onScroll);

    }

    transitionPage(e) {
        let page = 'promo-page-' + e;
        const element = document.getElementById(page);
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        window.scrollTo({ top: absoluteElementTop-60, left: 0, behavior: 'smooth' });
        let fpNav = document.getElementById('fp-nav');
        fpNav.style.opacity = 0;
        setTimeout(()=> fpNav.style.opacity = 1, 500);
    }

    render() {
        console.log(33);
        return (
            <div id="promo-page-main" className='promo-page-main'>
                <div id="promo-page-container" className="promo-page-container promo-page-multiple-container" data-selector="promo-page-container">
                    <div id="promo-page-1" data-selector="1" style={{'height': this.state.windowHeight-60}} className='promo-page-block-one promo-page-multiple-block'>

                        <div className='title'>Выбери лучшую машину по версии АВТОВАЗ</div>

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

                    </div>
                    <div id="promo-page-3" data-selector="3" style={{'height': this.state.windowHeight-60}} className='promo-page-block-three promo-page-multiple-block'>

                    </div>
                    {/*У footer data-selector="4"*/}
                </div>
                <div id="fp-nav" className="right fp-prev fp-next">
                    <input defaultChecked type="radio" name="slider" id="fp1"/>
                    <input type="radio" name="slider" id="fp2"/>
                    <input type="radio" name="slider" id="fp3"/>
                    <input type="radio" name="slider" id="fp4"/>
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