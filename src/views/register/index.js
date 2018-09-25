import React from 'react';
import { connect } from 'react-redux';

import { saveUser ,sendCaptcha } from '../../reducers/actions/auth';
import { Input, Button, Checkbox,Row, Col ,Form} from 'antd';
import { Link ,browserHistory} from 'react-router';

import SmsButton from '../shared/smsButton'
const InputGroup = Input.Group;
var moment = require('moment');

import  './Register.scss';

const FormItem = Form.Item;
const createForm = Form.create;

export class UserRegisterIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agreement:false,
            user:{
                phone:"",
                password:"",
                password_confirmation:"",
                mcaptcha:''
            },
            errors:{
                phone:"请输入手机号",
                password:"设置您的密码",
                password_confirmation:"请输入上面的密码"
            },
            isOk:false
        };
    }
    onSubmitForm(){
        if (this.state.isOk == false){
            for (let item in this.state.user){
                this.onCaptchaChange(item, {target:{value: this.state.user[item]}})
            }
            return
        }

        let params = {};
        params['user']=this.state.user;

        console.log("aaaa33333", params)
        this.props.saveUser(params)
    }

    onCaptchaChange(position,e){
        console.log(position ,e.target.value , "reset")
        let oldState=this.state.user,errors = this.state.errors;
        oldState[position] = e.target.value;
        // 手机号
        if (position === 'phone'){
            let parent_reg = /^1[3|5][0-9]\d{4,8}$/;
            if ( oldState[position].length == 11 & parent_reg.test(oldState[position])) {
                errors[position] = ''
            }else if (oldState['phone'] == 0 ){
                errors['phone'] ="请输入手机号"
            }else{
                errors['phone'] ="手机号格式有误，请修改您的手机号"
            }
        }
        // 密码
        if (position === 'password' ){
            if ( oldState[position].length >= 6) {
                errors[position] = ''
            }else if (oldState[position] == '' ){
                errors[position] ="请设置您的密码，密码长度大于6位"
            }else{
                errors[position] ="密码长度过短"
            }
        }
        // 重复密码
        if (position === 'password_confirmation') {
            if (oldState[position] == oldState['password'] && oldState[position] >= 6){
                errors[position]=''
            }else if (oldState[position] === '') {
                errors[position] ="请输入上面的密码"
            }else{
                errors[position] ='两次输入密码不一致';
            }
        }

        //是否可以提交
        let isOk = true;
        for (let item in errors){
            if( item == 'mcaptcha'){
                // 暂时去了，如果需要在添加
            }else if (errors[item] !== ''){
                isOk = false
            }
        }


        this.setState({
            user:oldState,
            errors:errors,
            isOk:isOk
        })
    }

    onAgreeChange(){
        this.setState({
            agreement: !this.state.agreement })
    }


    render() {

        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18},
        };
        return (
            <div className="register-container">
                <div className="register-mask"/>
                <Form horizontal className="register-content">
                    <h2>注册</h2>
                    <FormItem {...formItemLayout} label="手机号">
                        <Input onChange={this.onCaptchaChange.bind(this,'phone')}
                               type="text"
                               autoComplete="off"/>
                        <p className="error_tip">{this.state.errors['phone']}</p>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="验证码"
                    >
                        <Row gutter={8}>
                            <Col span={12}>
                                <Input onChange={this.onCaptchaChange.bind(this,'mcaptcha')}
                                       type="text" size='large'
                                       placeholder="点击右侧按钮获取验证码"/>
                            </Col>
                            <Col span={8}>
                                <SmsButton style={{width:'100px'}}
                                           phone={this.state.user.phone }
                                           sendCaptcha={this.props.sendCaptcha}/>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem {...formItemLayout} label="密码">
                        <Input onChange={this.onCaptchaChange.bind(this,'password')}
                               type="password"
                               autoComplete="off"/>

                        <p  className="error_tip">{this.state.errors['password']}</p>
                    </FormItem>
                    <FormItem {...formItemLayout} label="确认密码">
                        <Input onChange={this.onCaptchaChange.bind(this,'password_confirmation')}
                               type="password"
                               autoComplete="off"/>
                        <p className="error_tip">{this.state.errors['password_confirmation']}</p>
                    </FormItem>
                    <FormItem wrapperCol={{offset: 0}}>
                        <Checkbox checked={this.state.agreement} onChange={this.onAgreeChange.bind(this)}
                        >注册则视为您已同意<a>《富熊云商用户协议》</a></Checkbox>
                    </FormItem>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Button
                            type="primary"
                            size='large'
                            disabled={!this.state.agreement}
                            onClick={this.onSubmitForm.bind(this)}
                        >注册</Button>
                    </div>
                </Form>
            </div>
        );
    }
}


//redux
function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        saveUser: (params) => dispatch(saveUser(params)),
        sendCaptcha: (params) => dispatch(sendCaptcha(params))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRegisterIndex);
