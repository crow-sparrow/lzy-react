import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './back.css'
class Parent extends Component {
    goBack() {
        this.props.history.go(-1)
    }
    render() {
        return (
            <span className='back iconfont icon icon-fanhui' onClick={() => this.goBack()}></span>
        )
    }
}
export default withRouter(Parent)