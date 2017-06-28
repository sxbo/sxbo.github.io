/**
 * 路由配置
 */
import React from 'react';
import render from 'react-dom';
import {Link,Route,HashRouter as Router,Switch} from 'react-router-dom';


import Login from "./Login"
import Main from "./main"
import About from "./About"

export default class RouterConfig extends React.Component{


    
    render(){
        return(
            
            <div>

                <Router>
                    <div style={{height:'100%'}}>
                        <Route exact path="/" component={Main} />
                        <Route path="/login" component={Login} />
                    </div>
                </Router>
            </div>
        )
    }
}