// 验证码 按钮
//  props . phone 发送的手机号

import React from 'react';
import {Button} from 'antd';


class SmsButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsElapsed: 60, sendText: '发送验证码', sended: false
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        if (!!this.state.secondsElapsed) {
            this.setState({secondsElapsed: this.state.secondsElapsed - 1});
        } else {
            clearInterval(this.interval);
            this.setState({sended: false, secondsElapsed: 60});
            // this.setState({sended: false, secondsElapsed: 3});
        }
    }

    btnClick() {
        console.log(this.props.phone,this.props, "onclick code")
        let params = {
            phone : this.props.phone,
            optype :1
        };

        this.props.sendCaptcha(params)

        this.setState({sended: true});
        this.interval = setInterval(this.tick.bind(this), 1000);
    }

    render() {
        const text = this.state.sended ? (this.state.secondsElapsed + '秒') : this.state.sendText;
        let bgc = this.state.sended ? {backgroundColor: "lightgray"} : {backgroundColor: "#d74047"};
        return (

            <Button className={this.props.className}
                    size="large"
                    type="primary"
                    style={this.props.style}
                    onClick={this.btnClick.bind(this)} ref="sendBtn"
                    disabled={this.state.sended}>
                {text}
            </Button>
        );
    }
// <Button className={this.props.className}
// size="large" style={this.props.style}
// onClick={this.btnClick.bind(this)} ref="sendBtn"
// disabled={this.state.sended} >{text}</Button>
}


export default SmsButton
