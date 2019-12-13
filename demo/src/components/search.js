import React, { Component } from 'react'
import { InputItem, Button} from 'antd-mobile';
import './search.css'
export default class Parent extends Component {
    state = {
    }
    render() {
        return (
            <div className='top'>
                <InputItem
                    placeholder="Search"
                >
                    <span className='search iconfont icon icon-tubiao-'></span>
                </InputItem>
                <Button type='primary'>我要发布</Button>
            </div>
        )
    }
}