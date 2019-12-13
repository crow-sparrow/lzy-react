import React, { Component } from 'react';
import star1 from "../assets/img/star2.png"
import star2 from "../assets/img/star1.png"
import './score.css'
export default class App extends Component {
    state = {

    }

    arr = [];//声明的空数组用来表示评分
    commitScore(score) {//传进来评分参数
        this.arr = [];//首次清空数组，以免多次执行的时候会累加数组
        // var score = Math.ceil(score);//向上取整评分参数
        for (var i = 1; i <= 5; i++) {//控制数组的长度不能超过5
            if (i <= score) {//这里主要是根据评分设置数组，比如3分数组就会是[1,1,1,0,0]
                this.arr.push(1)
            } else {
                this.arr.push(0)
            }
        }
        console.log(this.arr);

    }
    stars(n) {
        this.commitScore(n);//这里应该传一个你从服务器接收到的评分参数
        var str = "";
        for (var i = 0; i < this.arr.length; i++) {//输出循环五个<img>标签
            if (this.arr[i] === 1) {
                str += '<img className="star" src=' + star1 + '>'//如果是1就用点亮的星星
            } else {
                str += '<img className="star" src=' + star2 + '>'//如果数组是0就用空白的星星
            }
        }
        this.refs.container1.innerHTML = str//将堆砌好的五个img标签赋值给文档中写死的容器，让页面渲染
    }
    componentDidMount() {
        let num = this.props.num
        this.stars(num);
    }
    componentWillReceiveProps(nextProps) {
        let num = nextProps.num
        this.stars(num);
    }
    render() {
        return (
            <div style={{ display: 'inline-block'}} ref="container1" className='score'>
            </div>
        )
    }
}