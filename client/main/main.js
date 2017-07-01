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

//计算沿z轴平移距离，270 img宽度，10 img数量
const r = Math.round( ( 162 / 2 ) /Math.tan( Math.PI / 10 ) );

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

const pictureTrans = keyframes`

    0%{
        transform:translateZ(0px)  rotateY(0deg) rotateX(10deg);
        -ms-transform:translateZ(0px) rotateY(0deg) rotateX(10deg);
        -webkit-transform:translateZ(0px) rotateY(0deg) rotateX(10deg);	
        -o-transform:translateZ(0px) rotateY(0deg) rotateX(10deg);		
        -moz-transform:translateZ(0px) rotateY(0deg) rotateX(10deg);
    }
    100%{
       transform:translateZ(${r}px) rotateY(360deg) rotateX(10deg);
        -ms-transform:translateZ(${r}px) rotateY(360deg) rotateX(10deg);
        -webkit-transform:translateZ(${r}px) rotateY(360deg) rotateX(10deg);	
        -o-transform:translateZ(${r}px) rotateY(360deg) rotateX(10deg);		
        -moz-transform:translateZ(${r}px) rotateY(360deg) rotateX(10deg);
    }
`;


const Root = styled(Layout)`
    height:100%;
    .header{
        display:flex;
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
        display:flex;
        .left-verse{
            position:absolute;
            top:200px;
            font-family:华文新魏;
            height:500px;
            width:66px;
            font-size:71px;
        }

        .right-verse{
            position:absolute;
            top:200px;
            right:0px;
            font-family:华文新魏;
            height:500px;
            width:66px;
            font-size:71px;

        }


        .pane{
            top:300px;
            left:46%;
            width:200px;
            height:220px;
            position:absolute;
            background-color:#fff;
            transform-style: preserve-3d;
            transform:translateZ(${r}px) rotateY(180deg) rotateX(10deg);
            animation:${pictureTrans} 5s infinite linear forwards;
            -moz-animation: ${pictureTrans} 5s infinite linear forwards;
            -webkit-animation: ${pictureTrans} 5s infinite linear forwards;
            -o-animation: ${pictureTrans} 5s infinite linear forwards;
            background-image:url(../../client/img/sh.jpg);
            background-size:100% 100%;
        }
        .pane img{
            display: block;
            position: absolute;
            width: 162px;
            height: 216px;
            top:10px;
            left:10px;
            border: 2px solid black;
            opacity:0.6;
            filter:alpha(opacity=60);
            &:hover{
                opacity:1;
                filter:alpha(opacity=100);
            }
            
        }
        .pane img:nth-child(1){transform:rotateY(  0deg) translateZ(${r}px);}
        .pane img:nth-child(2){transform:rotateY(  36deg) translateZ(${r}px);}
        .pane img:nth-child(3){transform:rotateY(  72deg) translateZ(${r}px);}
        .pane img:nth-child(4){transform:rotateY(  108deg) translateZ(${r}px);}
        .pane img:nth-child(5){transform:rotateY(  144deg) translateZ(${r}px);}
        .pane img:nth-child(6){transform:rotateY(  180deg) translateZ(${r}px);}
        .pane img:nth-child(7){transform:rotateY(  216deg) translateZ(${r}px);}
        .pane img:nth-child(8){transform:rotateY(  252deg) translateZ(${r}px);}
        .pane img:nth-child(9){transform:rotateY(  288deg) translateZ(${r}px);}
        .pane img:nth-child(10){transform:rotateY(  324deg) translateZ(${r}px);}
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
    }

    //随机生成16进制的颜色值
    // radomColor(){
    //     let color = Math.ceil(Math.random()*16777215).toString(16);
    //     if(color.length<6){
    //         color+="0";
    //     }
    //     return "#"+color;
    // }


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
                            <source src="../../client/music/aimei.mp3" type="audio/mp3" />
                            <source src="../.../client/music/aimei.ogg" type="audio/ogg"/>
                            <embed height="0" width="0" src="../../client/music/aimei.mp3"/>
                        </audio>
                        <div  id="header-content"></div>
                    </div>
                    <div className="header-right">
                        <Button className="button" shape="circle" icon="user"></Button>
                        <Button className="button" shape="circle" icon="logout" onClick={this.goLogin.bind(this)}></Button>
                    </div>
                </Header>
                <Content className="content">
                    {/*<div className="contain">*/}
                        <div className="pane" style={{left:'46%',top:(this.state.minHeight/2-100)+'px'}}>
                            <img src={require('../img/0.jpg')}/>
                            
                            <img src={require('../img/1.jpg')}/>
                            
                            <img src={require('../img/2.jpg')}/>
                            
                            <img src={require('../img/3.jpg')}/>
                            
                            <img src={require('../img/4.jpg')}/>
                            
                            <img src={require('../img/5.jpg')}/>
                            
                            <img src={require('../img/6.jpg')}/>
                            
                            <img src={require('../img/7.jpg')}/>
                            
                            <img src={require('../img/8.jpg')}/>
                            
                            <img src={require('../img/9.jpg')}/>
                            
                        </div>
                        <div className="left-verse">
                            <div style={{color:'#ff0000',height:'71px'}}>相</div>
                            <div style={{color:'#ff8900',height:'71px'}}>思</div>
                            <div style={{color:'#92c000',height:'71px'}}>相</div>
                            <div style={{color:'#00c024',height:'71px'}}>见</div>
                            <div style={{color:'#00c0da',height:'71px'}}>知</div>
                            <div style={{color:'#0053ff',height:'71px'}}>何</div>
                            <div style={{color:'#4800ff',height:'71px'}}>日</div>
                        </div>
                        <div className="right-verse">
                            <div style={{color:'#ff00ff',height:'71px'}}>此</div>
                            <div style={{color:'#4900ff',height:'71px'}}>时</div>
                            <div style={{color:'#0052ff',height:'71px'}}>此</div>
                            <div style={{color:'#00c0db',height:'71px'}}>夜</div>
                            <div style={{color:'#00c025',height:'71px'}}>难</div>
                            <div style={{color:'#91c000',height:'71px'}}>为</div>
                            <div style={{color:'#ff8a00',height:'71px'}}>情</div>
                        </div>

                   {/*</div>*/}
                </Content>
                <Footer style={{textAlign:'center',height:'10px'}}>
                    Photo Album ©2017 Created by Song
                </Footer>
            </Root>:
            <Redirect to="/login"></Redirect>
        )
    }
}