import React, { Component } from 'react'
import '../../assets/css/reset.css'
import './Home.css'
import axios from 'axios'
import Back from '../../components/back'
import Search from '../../components/search'
import Banner from '../../components/banner'
import logo1 from '../../assets/img/logo2-1.jpg'
import logo2 from '../../assets/img/logo2-2.jpg'
import logo3 from '../../assets/img/logo2-3.jpg'
import logo4 from '../../assets/img/logo2-4.jpg'
export default class Parent extends Component {
    state = {
        banner: [],
        rank: []
    }
    componentDidMount() {
        axios({
            url: '/teacherBanner'
        }).then(res => {
            console.log(res);
            this.state.banner = res.data.data
            setTimeout(() => {
                this.setState({

                });
            }, 100);
        });
        axios({
            url: '/teacherTop'
        }).then(res => {
            console.log(res);
            this.state.rank = res.data.data
            setTimeout(() => {
                this.setState({

                });
            }, 100);
        })
    }
    render() {
        return (
            <div className='home'>
                <div className='header'>
                    <Back></Back>
                    找家教
                    <span className='pos iconfont icon icon-dingwei'>成都</span>
                </div>
                <div className='content'>
                    <Search></Search>
                    <Banner banner={this.state.banner}></Banner>
                    <div className='middle'>
                        <div className='left'>
                            <span className='around iconfont icon icon-zhoubian'></span>
                            <h3>周边老师</h3>
                            <p>发现周边好老师</p>
                        </div>
                        <div className='right'>
                            <span className='around iconfont icon icon-tiwen'></span>
                            <h3>我要提问</h3>
                            <p>难题名师帮你解</p>
                        </div>
                    </div>
                    <div className='logo'>
                        <div className='icons'>
                            <img src={logo1} alt="" />
                            <p>小学</p>
                        </div>
                        <div className='icons'>
                            <img src={logo2} alt="" />
                            <p>初中</p>
                        </div>
                        <div className='icons'>
                            <img src={logo3} alt="" />
                            <p>高中</p>
                        </div>
                        <div className='icons'>
                            <img src={logo4} alt="" />
                            <p>兴趣</p>
                        </div>
                    </div>
                    <div className='rank'>
                        <p>top排行榜</p>
                        {
                            this.state.rank.map(item => {
                                return (
                                    <div key={item.id} className='teachers'>
                                        <img src={item.img} alt="" className='system'/>
                                        <img src={item.teacherImg} alt="" className='teacherImg'/>
                                        <span>已报名{item.num}人</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}