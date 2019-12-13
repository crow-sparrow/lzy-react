import React, { Component } from 'react'
import '../../assets/css/reset.css'
import Back from '../../components/back'
import User from '../../components/user'
import { Modal, Toast } from 'antd-mobile';
import './WaterDetail.css'
import axios from 'axios'
import Head from '../../assets/img/hmbb.jpg'
import Score from '../../components/score'
const prompt = Modal.prompt;
export default class Parent extends Component {
    state = {
        id: '',
        detail: {},
        remark: [],
        time: '',
        addRemark: {
            username: '',
            waterId: '',
            content: '',
            time: '',
        }
    }
    find() {
        var id = this.props.match.params.id;
        axios({
            url: '/findWater',
            method: 'get',
            params: {
                id: id
            }
        }).then(res => {
            this.setState({
                id: this.props.match.params.id,
                detail: res.data.data[0]
            })
            console.log(this.state.detail);
        })
        axios({
            url: '/findComment',
            method: 'get',
            params: {
                waterId: id
            }
        }).then(res => {
            console.log(res);
            this.setState({
                remark: res.data.data
            })
            var time2 = new Date().getTime();
            var time = this.state.remark.map(item => {
                return (
                    Math.floor((parseInt(time2) - parseInt(item.time)) / 3600000)
                )
            })
            this.setState({
                time
            })
        })
    }
    addRemark(con) {
        this.state.addRemark = {
            username: localStorage.getItem('username'),
            waterId: this.state.id,
            content: con,
            time: new Date().getTime()
        }
        console.log(this.state.addRemark);

        axios({
            url: '/addComment',
            method: 'get',
            params: this.state.addRemark
        }).then(res => {
            if (res.data.data.isok) {
                this.find()
                Toast.success("评论成功", 1)
            } else {
                Toast.fail("评论失败", 1)
            }
        })
    }
    componentDidMount() {
        this.find()
    }
    render() {
        return (
            <div className='waterDetail'>
                <div className='header'>
                    <Back></Back>
                    详情
                    <User></User>
                </div>
                <div className='content'>
                    <div className='info'>
                        <img src={this.state.detail.img} alt=""  className='img'/>
                        <span className='name'>{this.state.detail.name}</span>
                        <Score num={this.state.detail.score} className='score'></Score>
                        <span className='count'>月销{this.state.detail.count}桶</span>
                        <span className='price'>￥{this.state.detail.price}</span>
                        <span className='likeNum'>{this.state.detail.likeNum}</span>
                        <span className='readNum'>{this.state.detail.readNum}</span>
                        <span className='like iconfont icon icon-aixin'></span>
                        <span className='eye iconfont icon icon-guanzhu-'></span>
                    </div>
                    <div className='address'>
                        <span className='tel iconfont icon icon-tel'></span>
                        <span className='pos iconfont icon icon-dingwei'></span>
                        <span className='ads'>{this.state.detail.address}</span>
                        <span className='len'>{this.state.detail.len}</span>
                    </div>
                    <div className='des'>
                        <div className='title'>商家信息</div>
                        <div className='desText'>{this.state.detail.des}</div>
                    </div>
                    <div className='remark'>
                        <div className='title'>
                            <span className='talk'>TA们都在说</span>
                            <div className='write' onClick={() => prompt(
                                '添加评论',
                                '评论内容',
                                text => { this.addRemark(text) },
                                'text',
                            )}>
                                <span className='pen iconfont icon icon-bianji'></span>
                                <span>写评论</span>
                            </div>
                        </div>
                        <div className='remarks'>
                            {
                                this.state.remark.map((item, index) => {
                                    return (
                                        <div className='remarkContent' key={item.id}>
                                            <img src={item.ava ? item.ava : Head} alt="" />
                                            <span className='name'>{item.name}</span>
                                            <span className='inner'>{item.content}</span>
                                            <span className='time'>{this.state.time[index]}小时前</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}