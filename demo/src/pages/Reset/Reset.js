import React, { Component } from 'react'
import '../../assets/css/reset.css'
import './Reset.css'
import Back from '../../components/back'
import User from '../../components/user'
import Head from '../../assets/img/hmbb.jpg'
import { List, InputItem, Button, WhiteSpace, Modal, Toast } from 'antd-mobile';
import axios from 'axios'
export default class Parent extends Component {
    state = {
        user: {
            name: localStorage.getItem('username'),
            oldpass: '',
            newpass2: '',
            newpass: ''
        },
        img: '',
        tel:''
    }
    changeUser(val, props) {
        let user = this.state.user;
        user[props] = val;
        this.setState({
            user
        })
    }
    cancel() {
        this.setState({
            user: {
                name: localStorage.getItem('username'),
                oldPass: '',
                newPass2: '',
                newPass: ''
            }
        })
    }
    find() {
        this.$axios({
            url: '/findUser',
            method: 'post',
            data: {
                name: localStorage.getItem('username')
            }
        }).then(res => {
            this.setState({
                img: res.data.data[0].img,
                tel: res.data.data[0].tel
            })
            console.log(this.state.img);
        })
    }
    reset() {
        if (this.state.user.newpass === this.state.user.newpass2) {
            axios({
                url: '/changePassUser',
                method: 'post',
                data: this.state.user
            }).then(res => {
                console.log(res);
                localStorage.removeItem('username');
                Toast.success('修改成功', 1)
                this.props.history.replace('/login');
            })
        } else {
            Toast.fail('两次密码不一致', 1);
        }

    }
    changeHead(src) {
        if (src) {
            this.$axios({
                url: '/updateUser',
                method: 'post',
                data: {
                    name: localStorage.getItem('username'),
                    img: src
                }
            }).then(res => {
                console.log(res);
                Toast.success("修改成功", 1)
                this.find()
            })
        } else {
            Toast.fail('地址不能为空', 1)
        }
    }
    changeTel(tel) {
        if (tel) {
            this.$axios({
                url: '/updateUser',
                method: 'post',
                data: {
                    name: localStorage.getItem('username'),
                    tel: tel
                }
            }).then(res => {
                console.log(res);
                Toast.success("修改成功", 1)
                this.find()
            })
        } else {
            Toast.fail('电话不能为空', 1)
        }
    }
    componentDidMount() {
        this.find()
    }
    render() {
        const alert = Modal.alert;
        const prompt = Modal.prompt;
        return (
            <div className='reset'>
                <div className='header'>
                    <Back></Back>
                    账号设置
                    <User></User>
                </div>
                <div className='content'>
                    <div className='userHead'>
                        <img src={this.state.img ? this.state.img : Head} alt="" style={{ display: 'block' }} />
                        <p>手机：{this.state.tel}</p>
                        <Button type='primary' inline className='head' size='small' onClick={() => prompt(
                            '修改头像',
                            '请输入图片网址',
                            [
                                { text: '取消' },
                                { text: '提交', onPress: value => this.changeHead(value) },
                            ],
                            'text',
                        )}>修改头像</Button>
                        <Button type='primary' inline className='head' size='small' onClick={() => prompt(
                            '修改电话',
                            '请输入电话号码',
                            [
                                { text: '取消' },
                                { text: '提交', onPress: value => this.changeTel(value) },
                            ],
                            'text',
                        )}>修改电话</Button>
                    </div>
                    <List>
                        <InputItem
                            placeholder="用户名"
                            value={this.state.user.name}
                            onChange={(e) => this.changeUser(e, 'name')}
                            disabled
                        >
                            <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '0.42rem', width: '0.42rem' }} />
                        </InputItem>
                        <InputItem
                            placeholder="旧密码"
                            value={this.state.user.oldpass}
                            onChange={(e) => this.changeUser(e, 'oldpass')}
                            type='password'
                        >
                            <div style={{ backgroundImage: 'url(https://img.51miz.com/Element/00/37/81/41/40425fc6_E378141_6ff35f93.png)', backgroundSize: 'cover', height: '0.5rem', width: '0.42rem' }} />
                        </InputItem>
                        <InputItem
                            placeholder="新密码"
                            value={this.state.user.newpass}
                            onChange={(e) => this.changeUser(e, 'newpass')}
                            type='password'
                        >
                            <div style={{ backgroundImage: 'url(https://img.51miz.com/Element/00/37/81/41/40425fc6_E378141_6ff35f93.png)', backgroundSize: 'cover', height: '0.5rem', width: '0.42rem' }} />
                        </InputItem>
                        <InputItem
                            placeholder="确认密码"
                            value={this.state.user.newpass2}
                            onChange={(e) => this.changeUser(e, 'newpass2')}
                            type='password'
                        >
                            <div style={{ backgroundImage: 'url(https://img.51miz.com/Element/00/37/81/41/40425fc6_E378141_6ff35f93.png)', backgroundSize: 'cover', height: '0.5rem', width: '0.42rem' }} />
                        </InputItem>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button type='primary' onClick={() =>
                        alert('修改密码', '确认修改？', [
                            { text: '取消', onPress: () => this.cancel() },
                            { text: '确认', onPress: () => this.reset() },
                        ])
                    }>修改密码</Button>
                </div>
            </div>
        )
    }
}