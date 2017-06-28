/**
 * 主页
 */
import React from 'react';
import render from 'react-dom';
import styled ,{keyframes} from 'styled-components'
import {Layout,Button} from 'antd';
import {Icon, Row, Col, Breadcrumb} from 'antd';
import {Link,Redirect} from "react-router-dom";
const {Header,Content,Footer} = Layout;

const logoRotate = keyframes`

    0%{
        transform: rotateZ(0deg);
        -ms-transform: rotateZ(0deg);
        -webkit-transform: rotateZ(0deg);	
        -o-transform: rotateZ(0deg);		
        -moz-transform:rotateZ(0deg);
    }
    100%{
       transform: rotateZ(360deg);
        -ms-transform: rotateZ(360deg);
        -webkit-transform: rotateZ(360deg);	
        -o-transform: rotateZ(360deg);		
        -moz-transform:rotateZ(360deg);
    }
`;

const Root = styled(Layout)`
    height:100%;
    .header{
        display:flex;
        height:100px;
        background-color:#fff;
        .header-logo{
            margin-top:5px;
            height: 90px;
            width:90px;
            border-radius: 6px;
            transition:all .5s;
            overflow:hidden;
            text-align:center;
            img{
                border-radius:50%;
                max-width:90px;
                max-height:90px;
                width:100%;
                height:100%;
            } 
            animation:${logoRotate} 5s infinite linear forwards;
            -moz-animation: ${logoRotate} 5s infinite linear forwards;
            -webkit-animation: ${logoRotate} 5s infinite linear forwards;
            -o-animation: ${logoRotate} 5s infinite linear forwards;
            
        }
        .header-right{
            display:flex;
            align-items:flex-end;
            .button{
                margin:10px 5px;
            }
        }
        .header-content{
            flex-grow:1;
            display:flex;
            justify-content:center;
            .header-content-content{
                transform:rotateX(180deg);
                margin-bottom:5px;
                display:flex;
                justify-content:center;
                width:40%;
            }
        }
    }
    .content{
        background:#607D8B;
    }

`;








export default class Main extends React.Component{

    constructor(props){
        super(props)
        this.state={
            minHeight:'500px',
            loginStatus:false
        }
    }

    componentWillMount(){
        this.setState({
            minHeight:document.body.clientHeight,
        })

        if(sessionStorage.getItem('loginStatus')){
            this.setState(
                {
                    loginStatus:true
                }
            )
        }else{
            this.setState({
                loginStatus:false
            })
        }

    }

    componentDidMount(){
        window.onresize=()=>{
            this.setState({
                minHeight:document.body.clientHeight,
            })
        }

        const element =  document.getElementById("header-content");
        for(let i = 0 ;i<=50 ;i++){
            const fatherWidth = element.clientWidth;
            const fatherHeight = element.clientHeight;
            const child = document.createElement('div');
            child.style.height = fatherHeight+'px';
            child.style.width = fatherWidth/51+'px';
            element.appendChild(child);
        }
        
        
        
        setInterval(()=>{
            this.change(element);
        },1000);
    }

    //改变函数；
    change(element){
        for(let i=0; i<element.children.length;i++){
            element.childNodes[i].style.height = 
            Math.floor(Math.random()*80)+"px";
            element.childNodes[i].style.backgroundColor = this.radomColor();
        }
    }

    //随机生成16进制的颜色值
    radomColor(){
        let color = Math.ceil(Math.random()*16777215).toString(16);
        if(color.length<6){
            color+="0";
        }
        return "#"+color;
    }


    //退出
    goLogin(){
        sessionStorage.clear();
        this.setState(
            {
                loginStatus:false
            }
        )
    }

    render(){
        return(
            this.state.loginStatus?

            <Root style={{minHeight:this.state.minHeight}} >

                <Header className="header">
                    <div className="header-logo">
                        <img src={require('../img/hena2.jpg')}/>
                    </div>
                    <div className="header-content">
                        <audio autoPlay="true" loop="true" controls="" height="0px" width="0px">
                            <source src="client/music/aimei.mp3" type="audio/mp3" />
                            <source src="client/music/aimei.ogg" type="audio/ogg"/>
                            <embed height="0" width="0" src="client/music/aimei.mp3"/>
                        </audio>
                        <div className="header-content-content" id="header-content"></div>
                    </div>
                    <div className="header-right">
                        <Button className="button" shape="circle" icon="user"></Button>
                        <Button className="button" shape="circle" icon="logout" onClick={this.goLogin.bind(this)}></Button>
                    </div>
                </Header>
                <Content className="content">
                    
                </Content>
                <Footer style={{textAlign:'center',height:'10px',backgroundColor:'#B0BEC5'}}>
                    Photo Album ©2017 Created by Song
                </Footer>
            </Root>:
            <Redirect to="/login"></Redirect>
        )
    }
}