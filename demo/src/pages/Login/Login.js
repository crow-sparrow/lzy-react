import React, { Component } from 'react'
import '../../assets/css/reset.css'
import './Login.css'
import { List, InputItem, Button, WhiteSpace } from 'antd-mobile';
import QQ from '../../assets/img/QQ.png'
import weibo from '../../assets/img/weibo.png'
import weixin from '../../assets/img/weixin.png'
import {NavLink} from 'react-router-dom'
import Back from '../../components/back'
export default class Parent extends Component {
    state = {
        user: {
            name: "",
            pass: "",
            type: '2'
        }
    }
    changeUser(val, props) {
        let user = this.state.user;
        user[props] = val;
        this.setState({
            user
        })
    }
    login() {
        console.log(this.state.user);
        this.$axios({
            url:'/login',
            method:'post',
            data:this.state.user
        }).then(res=>{
            console.log(res);
            if(res.data.isok){
                this.props.history.push('/index')
                localStorage.setItem('username',this.state.user.name)
            }else{
                alert(res.data.info)
            }
        })
    }

    render() {
        return (
            <div className='login'>
                <div className='header'>
                    <Back></Back>
                    登 录
                </div>
                <div className='content'>
                    <List>
                        <InputItem
                            placeholder="用户名"
                            value={this.state.user.name}
                            onChange={(e) => this.changeUser(e, 'name')}
                        >
                            <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '0.42rem', width: '0.42rem' }} />
                        </InputItem>
                        <InputItem
                            placeholder="密码"
                            value={this.state.user.pass}
                            onChange={(e) => this.changeUser(e, 'pass')}
                            type='password'
                        >
                            <div style={{ backgroundImage: 'url(https://img.51miz.com/Element/00/37/81/41/40425fc6_E378141_6ff35f93.png)', backgroundSize: 'cover', height: '0.5rem', width: '0.42rem' }} />
                        </InputItem>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button type='primary' onClick={()=>this.login()}>登录</Button>
                    <WhiteSpace />
                    <span className='forget'>忘记密码?</span>
                    <WhiteSpace />
                    <WhiteSpace />
                    <NavLink className='toRegister' to='/register'>注册</NavLink>
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                    <div className='others'>
                        <span className='else'>或者</span>
                        <p>社交账号快速登录</p>
                        <div className='icons'>
                            <img src={QQ} alt="" />
                            <img src={weibo} alt="" />
                            <img src={weixin} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}