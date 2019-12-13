import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Login from './pages/Login/Login'
import Index from './pages/Index/Index'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import Water from './pages/Water/Water'
import Fix from './pages/Fix/Fix'
import Clean from './pages/Clean/Clean'
import WaterDetail from './pages/WaterDetail/WaterDetail'
import FixDetail from './pages/FixDetail/FixDetail'
import CleanMember from './pages/CleanMember/CleanMember'
import MemberDetail from './pages/MemberDetail/MemberDetail'
import Reset from './pages/Reset/Reset'
export default class Parent extends Component {
  endY=0;
  start(e){
    this.endY=0;
  }
  move(e){
    this.endY=e.touches[0].clientY;
  }
  end(e){
    if(this.endY!==0){
      // e.stopPropagation();
    }
  }
  render() {
    return (
      <div onTouchStartCapture={(e)=>this.start(e)}
      onTouchMoveCapture={(e)=>this.move(e)}
      onTouchEndCapture={(e)=>this.end(e)}
      >      
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/index" component={Index}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/water" component={Water}></Route>
          <Route path="/fix" component={Fix}></Route>
          <Route path="/clean" component={Clean}></Route>
          <Route path="/waterDetail/:id" component={WaterDetail}></Route>
          <Route path="/fixDetail/:id" component={FixDetail}></Route>
          <Route path="/cleanMember/:type" component={CleanMember}></Route>
          <Route path="/memberDetail/:id" component={MemberDetail}></Route>
          <Route path="/reset" component={Reset}></Route>
          <Redirect to='/login'> </Redirect>
        </Switch>
      </div>
    )
  }
}