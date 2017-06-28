import React from 'react';
import render from 'react-dom';
import styled,{keyframes} from 'styled-components';
import { Form, Icon, Input, Button ,Checkbox } from 'antd';
import {Redirect} from "react-router-dom"; 
const FormItem = Form.Item;
const conversion = keyframes`
    0%{
        filter:blur(7px);
    }
    100%{
        filter:blur(0px);
    }
`;

const Root = styled.div`
    position:relative;
    .background{
        width:100%;
        height:100%;
        background-image:url(client/img/ocean.jpg);
        background-size:100% 100%;
        filter:blur(6px);
        
        animation-name:${conversion};
        animation-duration:2s;
        animation-timing-function:linear;
        animation-iteration-count:infinite;
        animation-direction:alternate;
       
        }
    }

    
    .center{
        filter:alpha(opacity=50);
        opacity:0.50;
        position:absolute;
        width:400px;
        padding:20px 40px;
        padding-bottom:0px;
        border-radius:15px;
        background-color:#F5F5F5;
        .login-form-button{
            margin-top:5px;
            width:320px;
        }
        .ant-input-affix-wrapper .ant-input{
            background-color:transparent;
            border-color:#29B6F6;
        }
    }
`;



class LoginForm extends React.Component{

    constructor(props){
        super(props)
        this.state={
            height:document.body.clientHeight,
            loginStatus:false
        }
    }

    componentWillMount(){
        localStorage.setItem("username","hena");
        localStorage.setItem("password","0926");
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(!err){
                if(values.userName ===localStorage.getItem("username")&&values.password===localStorage.getItem("password")){
                    sessionStorage.setItem("loginStatus",true)
                    this.setState({
                        loginStatus:true
                    })
                }
            }
        })

    }
    
    componentDidMount(){
        this.setState(
            {
                height:document.body.clientHeight
            }
        )

        //初始位置
        document.getElementById('logindiv').style.left=
            (document.body.clientWidth-document.getElementById('logindiv').clientWidth)/2 +'px';
        document.getElementById('logindiv').style.top=
            (document.body.clientHeight-document.getElementById('logindiv').clientHeight)/2 +'px';
        //事件监听窗口大小改变位置
        window.onresize=()=>{
            this.setState({
                height:document.body.clientHeight
            })
            document.getElementById('logindiv').style.left=
                (document.body.clientWidth-document.getElementById('logindiv').clientWidth)/2 +'px';
            document.getElementById('logindiv').style.top=
                (document.body.clientHeight-document.getElementById('logindiv').clientHeight)/2 +'px';
            
        }
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        if(this.state.loginStatus){
            return(
                <Redirect to={{pathname:'/'}}></Redirect>
            )
        }else{
            return(
            <Root style={{height:this.state.height}}>
                <div className="background"></div>
                <div className="center" id="logindiv">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem>
                            {getFieldDecorator('userName', 
                                {rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', 
                                {rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {valuePropName: 'checked',initialValue: true,
                            })(
                            <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">Forgot password</a><br/>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            <br/>
                                Or <a href="">register now!</a>
                        </FormItem>
                    </Form>

                </div>
            </Root>
            )
        }
    }
} 

const Login = Form.create()(LoginForm);

export default Login;