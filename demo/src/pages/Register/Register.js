import React, { Component } from 'react'
import '../../assets/css/reset.css'
import './Register.css'
import { List, InputItem, Button, WhiteSpace } from 'antd-mobile';
import Back from '../../components/back'
export default class Parent extends Component {
    state = {
        user: {
            tel: '',
            name: '',
            pass: '',
            code: ''
        }
    }
    register() {
        this.$axios({
            url: '/addUser',
            method: 'post',
            data: this.state.user
        }).then(res => {
            console.log(res);
            if (res.data.isok) {
                alert(res.data.info)
                this.props.history.push('/login')
            } else {
                alert(res.data.info)
            }
        })
    }
    changeUser(val, props) {
        let user = this.state.user;
        user[props] = val;
        this.setState({
            user
        })
    }
    render() {
        return (
            <div className='register'>
                <div className='header'>
                    <Back></Back>
                    注 册</div>
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
                            placeholder="手机号码/邮箱"
                            value={this.state.user.tel}
                            onChange={(e) => this.changeUser(e, 'tel')}
                        >
                            <div style={{ backgroundImage: 'url(https://img.51miz.com/Element/00/37/75/61/a972e63c_E377561_113acb69.png)', backgroundSize: 'cover', height: '0.5rem', width: '0.42rem' }} />
                        </InputItem>
                        <InputItem
                            placeholder="手机验证码"
                            value={this.state.user.code}
                            onChange={(e) => this.changeUser(e, 'code')}
                            extra={<Button type="primary" size="small" inline>验证码</Button>}
                        // multipleLine
                        >
                            <div style={{ backgroundImage: 'url(https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2627911893,2822744372&fm=15&gp=0.jpg)', backgroundSize: 'cover', height: '0.5rem', width: '0.42rem' }} />
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
                    <Button type='primary' onClick={() => this.register()}>注册</Button>
                </div>
            </div>
        )
    }
}