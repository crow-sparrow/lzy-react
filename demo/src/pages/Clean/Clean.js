import React, { Component } from 'react'
import '../../assets/css/reset.css'
import './Clean.css'
import Back from '../../components/back'
import User from '../../components/user'
import Search from '../../components/search'
import Banner from '../../components/banner'
import axios from 'axios'
import logo1 from '../../assets/img/logo3-1.jpg'
import logo2 from '../../assets/img/logo3-2.jpg'
import logo3 from '../../assets/img/logo3-3.jpg'
import logo4 from '../../assets/img/logo3-4.jpg'
import logo5 from '../../assets/img/logo3-5.jpg'
import logo6 from '../../assets/img/logo3-6.jpg'
import logo7 from '../../assets/img/logo3-7.jpg'
import logo8 from '../../assets/img/logo3-8.jpg'
import foot from '../../assets/img/foot.jpg'
export default class Parent extends Component {
    state = {
        banner: []
    }
    toMember(type) {
        this.props.history.push('/cleanMember/' + type)
    }
    componentDidMount() {
        axios({
            url: '/homeBanner'
        }).then(res => {
            console.log(res);
            this.state.banner = res.data.data;
            setTimeout(() => {
                this.setState({

                });
            }, 100);
        })
    }
    render() {
        return (
            <div className='clean'>
                <div className='header'>
                    <Back></Back>
                    找家政
                    <User></User>
                </div>
                <div className='content'>
                    <Search></Search>
                    <Banner banner={this.state.banner}></Banner>
                    <div className='cleanLogo'>
                        <div onClick={() => this.toMember('钟点工')}>
                            <img src={logo1} alt="" />
                            <p>钟点工</p>
                        </div>
                        <div onClick={() => this.toMember('保姆')}>
                            <img src={logo2} alt="" />
                            <p>保姆</p>
                        </div>
                        <div onClick={() => this.toMember('月嫂')}>
                            <img src={logo3} alt="" />
                            <p>月嫂</p>
                        </div>
                        <div onClick={() => this.toMember('专业保洁')}>
                            <img src={logo4} alt="" />
                            <p>专业保洁</p>
                        </div>
                        <div onClick={() => this.toMember('家电清洗')}>
                            <img src={logo5} alt="" />
                            <p>家电清洗</p>
                        </div>
                        <div onClick={() => this.toMember('家具保养')}>
                            <img src={logo6} alt="" />
                            <p>家具保养</p>
                        </div>
                        <div onClick={() => this.toMember('新居开荒')}>
                            <img src={logo7} alt="" />
                            <p>新居开荒</p>
                        </div>
                        <div>
                            <img src={logo8} alt="" />
                            <p>更多</p>
                        </div>
                    </div>
                    <div className='foot'>
                        <div>
                            <span>临时小时工预约点击这里</span>
                            <img src={foot} alt="" />
                        </div>
                        <div>
                            <span>临时小时工预约点击这里</span>
                            <img src={foot} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}