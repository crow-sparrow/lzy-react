import React, { Component } from 'react'
import './Water.css'
import Back from '../../components/back'
import User from '../../components/user'
import axios from 'axios'
import Score from '../../components/score'
export default class Parent extends Component {
    state = {
        water: []
    }
    toDetail(id) {
        this.props.history.push('/waterDetail/' + id)
    }
    componentDidMount() {
        axios({
            url: '/findWater'
        }).then(res => {
            console.log(res);
            this.setState({
                water: res.data.data
            });
        })
    }
    render() {
        return (
            <div className='water'>

                <div className='header'>
                    <Back></Back>
                    送水到家
                    <User></User>
                </div>
                <div className='nav'>
                    <div>水站<span className='down iconfont icon icon-jiantou'></span></div>
                    <div>区域<span className='down iconfont icon icon-jiantou'></span></div>
                    <div style={{ border: 'none' }}>智能排序<span className='down iconfont icon icon-jiantou'></span></div>
                </div>
                <div className='content'>
                    {
                        this.state.water.map(item => {
                            return (
                                <div key={item.id} className='waterStation' onClick={() => this.toDetail(item.id)}>
                                    <img src={item.img} alt="" className='img' />
                                    <span className='name'>{item.name}</span>
                                    <Score num={item.score}></Score>
                                    <span className='des'>{item.des}</span>
                                    <span className='pos iconfont icon icon-dingwei'></span>
                                    <span className='address'>{item.address}</span>
                                    <span className='len'>{item.len}</span>
                                    <span className='tel iconfont icon icon-tel'></span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}