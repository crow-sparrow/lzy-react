import React, { Component } from 'react'
import '../../assets/css/reset.css'
import './MemberDetail.css'
import axios from 'axios'
import Back from '../../components/back'
import User from '../../components/user'
import { Button } from 'antd-mobile';
export default class Parent extends Component {
    state = {
        detail: {},
        qualification: [],
    }
    componentDidMount() {
        axios({
            url: '/findHomeWorker',
            method: 'get',
            params: {
                id: this.props.match.params.id
            }
        }).then(res => {
            console.log(res);
            this.setState({
                detail: res.data.data[0]
            })
            this.setState({
                qualification: res.data.data[0].qualification.split(',')
            })
        })
    }
    render() {
        return (
            <div className='member-detail'>
                <div className='header'>
                    <Back></Back>
                    {this.state.detail.name}
                    <User></User>
                </div>
                <div className='content'>
                    <div className='info'>
                        <div className='left'><img src={this.state.detail.img} alt="" /></div>
                        <div className='right'>
                            <p>
                                <span className='name'>{this.state.detail.name}</span>
                                <span className='ex'>{this.state.detail.experience}年教龄</span>
                                <span className='level'>V{this.state.detail.vNum}</span>
                                <span className='hour'>/小时</span>
                                <span className='price'>￥{this.state.detail.price}</span>
                            </p>
                            <p className='second'>
                                <span>{this.state.detail.city}</span>|
                                <span>{this.state.detail.age}岁</span>|
                                <span>{this.state.detail.edu}</span>|
                                <span>{this.state.detail.year}年经营</span>
                            </p>
                            <p style={{ margin: 0, height: '0.5rem' }}>
                                <Button inline size='small' className='attention'>关注</Button>
                                <Button inline type='primary' size='small' className='ask'>向TA提问</Button>
                            </p>
                            <p>
                                <span className='eye iconfont icon icon-guanzhu-'> {this.state.detail.readNum}</span>
                                <span className='like iconfont icon icon-aixin'> {this.state.detail.likeNum}</span>
                                <span className='ads iconfont icon icon-dingwei'> 距离你{this.state.detail.len}公里</span>
                            </p>
                        </div>
                    </div>
                    <div className='des'>
                        <div className='title'>简介</div>
                        <div style={{padding:'0.2rem'}}>
                            <p className='qualification'>资格认证: {
                                this.state.qualification.map(item => {
                                    return (
                                        <span key={item} className='iconfont icon icon-renzheng' style={{color:'#86cbeb'}}>{item}   </span>
                                    )
                                })
                            }</p>
                            <p className='type'>服务项目: <span>{this.state.detail.type}</span></p>
                            <p className='self'>自我评价: <span>{this.state.detail.info}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}