import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './assets/js/rem'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom';
import './assets/css/iconfont.css'
import {Toast} from 'antd-mobile'
// import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import './index.css';
Component.prototype.$axios = axios
axios.interceptors.response.use(response => {
    console.log("------------请求数据回来啦" + response.config.url + "--------------");
    console.log(response);
    console.log("-------over--------");
    if (response.data.code == -1) {
        window.open('http://localhost:3000/login', '_self')
        return {
            data: {
                data: []
            }
        }
    }
    return response
    // Toast.loading('Loading...', 1, () => {
    //     return response
    // });

})
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
