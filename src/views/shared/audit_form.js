import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Input, Form, Radio, Modal, Icon, Upload, Button, Popconfirm, Row, Col} from 'antd';
import {getUpToken, formItemLayout4_20} from '../../utils/helper';
import update from 'immutability-helper';
let RadioGroup = Radio.Group
let RadioButton = Radio.Button
const FormItem = Form.Item;
class AuditForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 1,
            reason: "",
            error: null
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data != this.props.data) {
            this.setState({status: 1, reason: nextProps.data.reason,})
        }
    }

    onChange(e) {
        this.setState({error: null})
        let value = e.target.value;
        this.setState({status: value})
    }

    onTextChange(e) {
        let value = e.target.value;
        this.setState({reason: value})
        this.validate(value)
    }

    getData() {
        return this.state
    }

    validate(reason = null) {
        reason = reason == null ? this.state.reason : reason;
        if (this.state.status == 0) {
            this.setState({error: "请填写审核结果"});
            return false
        } else {
            if (this.state.status == 2) {
                //判断undefined 和 null 状态 ，reason字段去掉空格
                if (!!reason == false || (_.trim(reason).length == 0)) {
                    this.setState({error: "不能为空"});
                    return false
                }
            }
            this.setState({error: null});
            return true
        }
    }

    showClassName() {
        return this.state.error != null ? "has-error" : ""
    }

    render() {
        return (
            <div>
                <FormItem label="审核" className={this.showClassName()} {...formItemLayout4_20}>
                    <RadioGroup ref="radio_group" value={this.state.status} size="large"
                                onChange={this.onChange.bind(this)}>
                        <RadioButton value={1}>通过</RadioButton>
                        <RadioButton value={2}>未通过</RadioButton>
                    </RadioGroup>
                    <div className="mt10">
                        <Input ref="reason" value={this.state.reason} onChange={this.onTextChange.bind(this)}
                               placeholder="未通过原因"
                               className={this.state.status == 1 ? "hidden" : ""} type="textarea" rows={4}/>
                    </div>
                    <div className="ant-form-explain">{this.state.error}</div>
                </FormItem>
            </div>
        )
    }
}
export default  AuditForm;
