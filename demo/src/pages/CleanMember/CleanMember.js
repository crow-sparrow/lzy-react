import React, { Component } from 'react'
import '../../assets/css/reset.css'
import './CleanMember.css'
import Back from '../../components/back'
import SearchIcon from '../../components/searchIcon'
import axios from 'axios'
export default class Parent extends Component {
    state = {
        member: [],
        type: this.props.match.params.type
    }
    toDetail(id) {
        this.props.history.push('/memberDetail/' + id)
    }
    componentDidMount() {
        var type = this.props.match.params.type
        axios({
            url: '/findHomeWorker',
            method: 'get',
            params: {
                type
            }
        }).then(res => {
            console.log(res);
            this.setState({
                member: res.data.data
            })
        })
    }
    render() {
        return (
            <div className='member'>
                <div className='header'>
                    <Back></Back>
                    {this.state.type}
                    <SearchIcon></SearchIcon>
                </div>
                <div className='nav'>
                    <div>籍贯<span className='down iconfont icon icon-jiantou'></span></div>
                    <div>工资<span className='down iconfont icon icon-jiantou'></span></div>
                    <div style={{ border: 'none' }}>年龄<span className='down iconfont icon icon-jiantou'></span></div>
                </div>
                <div className='content'>
                    {
                        this.state.member.map(item => {
                            return (
                                <div className='memberDetail' key={item.id} onClick={() => this.toDetail(item.id)}>
                                    <div className='left'>
                                        <img src={item.img} alt="" />
                                    </div>
                                    <div className='right'>
                                        <p>
                                            <span className='name'>{item.name}</span>
                                            <span className='ex'>{item.experience}年教龄</span>
                                            <span className='level'>V{item.vNum}</span>
                                            <span className='hour'>/小时</span>
                                            <span className='price'>￥{item.price}</span>
                                        </p>
                                        <p className='second'>
                                            <span>{item.city}</span>|
                                            <span>{item.age}岁</span>|
                                            <span>{item.edu}</span>|
                                            <span>{item.year}年经营</span>
                                        </p>
                                        <p className='info'>{item.info}</p>
                                        <p>
                                            <span className='eye iconfont icon icon-guanzhu-'> {item.readNum}</span>
                                            <span className='like iconfont icon icon-aixin'> {item.likeNum}</span>
                                        </p>
                                        <p className='len'>
                                            <span className='ads iconfont icon icon-dingwei'> 距离你{item.len}公里</span>
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}