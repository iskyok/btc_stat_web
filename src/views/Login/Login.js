import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { loginUser } from '../../reducers/actions/auth';

import './Login.scss';

const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginFaileCallback = this.loginFaileCallback.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((errors) => {
      if (errors) {
        return false;
      }
      const creds = (this.props.form.getFieldsValue());
      console.log("jjjjj",creds)
      dispatch(loginUser(creds, this.loginFaileCallback));
    });
  }

  loginFaileCallback(login, message){
    const { setFields } = this.props.form;
    const newValue = {
      login: {
        name: "login",
        validating: false,
        value: name,
        errors: [message]
      }
    };
    setFields(newValue);
  }

  render() {
    const { getFieldProps } = this.props.form;
    const loginProps = getFieldProps('name', {
      validate: [{
        rules: [
          { required: true }
        ],
        trigger: 'onBlur'
      }]
    });

    const passwordProps = getFieldProps('password', {
      rules: [
        { required: true, min: 6, message: '密码至少为 6 个字符' }
      ]
    });

    return (
      <div className="login-container">
        <div className="login-mask"/>
        <Form className="login-content" horizontal onSubmit={this.handleSubmit} >
          <h2>Coins Manage</h2>
          <FormItem label="账号" hasFeedback>
            <Input
              {...loginProps}
              placeholder="请输入账号"
            />
          </FormItem>
          <FormItem label="密码" hasFeedback>
            <Input {...passwordProps} type="password" autoComplete="off" placeholder="请输入密码"
                   onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
          </FormItem>
          <FormItem>
            <Button className="ant-col-24" type="primary" htmlType="submit">Login</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth
  };
}

export default connect(mapStateToProps)(createForm()(Login));
