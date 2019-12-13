import React, { Component } from 'react'
import '../../assets/css/reset.css'
import './Fix.css'
import Back from '../../components/back'
import axios from 'axios'
import SearchIcon from '../../components/searchIcon'
import Score from '../../components/score'
export default class Parent extends Component {
    state = {
        fix: []
    }
    componentDidMount() {
        axios({
            url: '/findRepair'
        }).then(res => {
            console.log(res);
            this.state.fix = res.data.data;
            setTimeout(() => {
                this.setState({

                });
            }, 100);
        })
    }
    toDetail(id) {
        this.props.history.push('/fixDetail/' + id)
    }
    render() {
        return (
            <div className='fix'>
                <div className='header'>
                    <Back></Back>
                    商家列表
                    <SearchIcon></SearchIcon>
                </div>
                <div className='nav'>
                    <div>手机维修<span className='down iconfont icon icon-jiantou'></span></div>
                    <div>区域<span className='down iconfont icon icon-jiantou'></span></div>
                    <div style={{ border: 'none' }}>智能排序<span className='down iconfont icon icon-jiantou'></span></div>
                </div>
                <div className='content'>
                    {
                        this.state.fix.map(item => {
                            return (
                                <div key={item.id} className='fixStation' onClick={() => this.toDetail(item.id)}>
                                    <span className='name'>{item.name}</span>
                                    <Score num={item.score}></Score>
                                    <span className='type'>{item.type}</span>
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