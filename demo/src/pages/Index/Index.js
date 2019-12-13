import React, { Component } from 'react'
import '../../assets/css/reset.css'
import './Index.css'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import logo1 from '../../assets/img/logo-1.jpg'
import logo2 from '../../assets/img/logo-2.jpg'
import logo3 from '../../assets/img/logo-3.jpg'
import logo4 from '../../assets/img/logo-4.jpg'
import logo5 from '../../assets/img/logo-5.jpg'
import logo6 from '../../assets/img/logo-6.jpg'
import { Drawer, Toast } from 'antd-mobile';
import Banner from '../../components/banner'
import Search from '../../components/search'
import User from '../../components/user'
export default class Parent extends Component {
    state = {
        banner: [],
        time: '',
        week: '',
        open: false,
        username: localStorage.getItem('username'),
        side: [
            {

            },
            {
                icon: 'sideIcon icon iconfont icon-laoshi',
                info: '找家教',
                path: '/home'
            },
            {
                icon: 'sideIcon icon iconfont icon-water_icon',
                info: '送水到家',
                path: '/water'
            },
            {
                icon: 'sideIcon icon iconfont icon-weixiu',
                info: '维修服务',
                path: '/fix'
            },
            {
                icon: 'sideIcon icon iconfont icon-saoba',
                info: '家政服务',
                path: '/clean'
            },
            {
                icon: 'sideIcon icon iconfont icon-shequ',
                info: '社区互动',
                path: '',
            },
            {
                icon: 'sideIcon icon iconfont icon-xiaoxi',
                info: '消息中心',
                path: ''
            },
            {
                icon: 'sideIcon icon iconfont icon-shoucang',
                info: '我的收藏',
                path: ''
            },
            {
                icon: 'sideIcon icon iconfont icon-fabu',
                info: '我的发布',
                path: ''
            },
            {
                icon: 'sideIcon icon iconfont icon-shezhichilunshebei',
                info: '账号设置',
                path: '/reset'
            }]
    }
    onOpenChange = (...args) => {
        console.log(args);
        this.setState({ open: !this.state.open });
    }
    exit() {
        axios({
            url: '/exit',
        }).then(res => {
            localStorage.removeItem('username')
            this.props.history.replace('/login');
        })
    }
    loadingToast() {
        Toast.loading('Loading...', 1, () => {
            console.log('Load complete !!!');
        });
    }
    componentDidMount() {
        // simulate img loading
        this.$axios({
            url: '/banner',
        }).then(res => {
            console.log(res);
            this.state.banner = res.data.data
            setTimeout(() => {
                this.setState({

                });
            }, 100);
        })
        Toast.loading('Loading...', 30, () => {
            console.log('Load complete !!!');
        });

        setTimeout(() => {
            Toast.hide();
        }, 1000);

        var date = new Date();
        var hour = (date.getHours() + "").padStart(2, '0');
        var min = (date.getMinutes() + "").padStart(2, '0');
        var arr = ['日', '一', '二', '三', '四', '五', '六']
        var week = arr[date.getDay()]
        this.state.time = hour + ':' + min
        this.state.week = '星期' + week
    }
    render() {
        const sidebar = (<div>
            {this.state.side.map((item, index) => {
                if (index === 0) {
                    return (
                        <div className='userInf' key={index}>
                            <img src="http://img1.imgtn.bdimg.com/it/u=941750238,2671260055&fm=26&gp=0.jpg" alt="" />
                            <span>{this.state.username}</span>
                        </div>
                    );
                }
                return (
                    <NavLink className='list' key={index} to={item.path}>
                        <span className={item.icon}></span>
                        <span>{item.info}</span>
                    </NavLink>
                );
            })}
            <div className='list out' onClick={() => this.exit()}>
                <span className='sideIcon iconfont icon icon-fanhui'></span>
                <span>退出登录</span>
            </div>
        </div>);
        return (
            <div className='index'>
                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
                    <div className='header'>
                        <span className='side iconfont icon icon-align-justify-solid' onClick={this.onOpenChange}></span>
                        龙山家园
                        <User></User>

                    </div>
                    <div className='content'>
                        <Search></Search>
                        <Banner banner={this.state.banner}></Banner>
                        <div className='scene'>
                            <div className='weather'>
                                <span className='weaIcon iconfont icon icon--'></span>
                                <span>多云/小雨&nbsp;&nbsp;&nbsp;27/30C</span><br />
                                <span>3-4级/4-5级风</span>
                            </div>
                            <div className='time'>
                                <span>{this.state.week}</span><br />
                                <span>{this.state.time}</span>
                            </div>
                        </div>
                        <div className='logo'>
                            <NavLink to='/home' className='link'>
                                <img src={logo1} alt="" />
                                <p>找家教</p>
                            </NavLink>
                            <NavLink to='/water' className='link'>
                                <img src={logo2} alt="" />
                                <p>送水到家</p>
                            </NavLink>
                            <NavLink to='/fix' className='link'>
                                <img src={logo3} alt="" />
                                <p>维修服务</p>
                            </NavLink>
                            <NavLink to='/clean' className='link'>
                                <img src={logo4} alt="" />
                                <p>家政</p>
                            </NavLink>
                            <NavLink to='/index' className='link'>
                                <img src={logo5} alt="" />
                                <p>社区互动</p>
                            </NavLink>
                            <NavLink to='/index' className='link'>
                                <img src={logo6} alt="" />
                                <p>更多服务</p>
                            </NavLink>
                        </div>
                    </div>
                </Drawer>


            </div>
        )
    }
}