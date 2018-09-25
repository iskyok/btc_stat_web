import React from 'react';
import {Button, Row, Col, Checkbox, Radio, Upload, Icon, Cascader, Select, Form, Alert, Input} from 'antd';
const InputGroup = Input.Group;
var _=require("lodash")
var area = ""
var tel = ""
var tel_split = ""
export  default class TelInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      area: "",
      tel: "",
      tel_split: "",
      error: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    //把座机号拆成三部分传给座机号码的专用组件
    if (nextProps.initNumber!=undefined){
      this.setState({
        area: nextProps.initNumber.split("-")[0],
        tel: nextProps.initNumber.split("-")[1],
        tel_split: nextProps.initNumber.split("-")[2],
      })
      area = nextProps.initNumber.split("-")[0],
      tel = nextProps.initNumber.split("-")[1],
      tel_split = nextProps.initNumber.split("-")[2]
    }
  }

  componentWillUnmount() {
    //清空这三个静态变量，防止下次进入这个页面显示之前输入的值
    area = ""
    tel = ""
    tel_split = ""
  }

  validate(){
    var that=this;
    var result=true
    for (let key of["area","tel"]){
      console.log(key,"====",that.validate_item(key,that.state[key]))
      if (!that.validate_item(key,that.state[key] || "")){
        result= false
        break
      }
    }
    return result
  }
  validate_item(key, value) {
    let error = null;
    if (key == "area" && value.length == 0) {
      error = "区号不能为空"
      this.setState({error: error})
      return false
    } else if (key == "tel" && value.length == 0) {
      error = "座机号不能为空"
      this.setState({error: error})
      return false
    } else if (key == "tel_split" && value.length == 0) {
      error = "分机号不能为空"
      this.setState({error: error})
      return false
    }else{
      this.setState({error: null})
      return true
    }
  }

  getValue() {
    // return this.state.area + "-" + this.state.tel + "-" + this.state.tel_split
    // 用state会在setState之后出现延迟，getValue时获得的是前一次输入的值，所以改用静态变量
    return area + "-" + tel +(tel_split? ( "-" + tel_split) : "");
  }

  onChangeValue(key, e) {
    let data = {}
    data[key] = e.target.value
    this.setState(data)
    if(key !== "tel_split"){
      // 分机号不做验证
      this.validate_item(key, e.target.value);
    }
    if(key == "area"){
      area = e.target.value
    }else if(key == "tel"){
      tel = e.target.value
    }else if(key == "tel_split"){
      tel_split = e.target.value
    }
    this.props.onChange && this.props.onChange(this.getValue())
  }

  initValue(key) {
    let values = (this.props.value || "").split("-")
    return values[key]
  }

  render() {
    return (<div>
      <InputGroup size="large">
        <Col span="4"><Input value={this.state.area} onChange={this.onChangeValue.bind(this, "area")} ref="area"
                             placeholder="区号"/></Col>
        <Col span="8"><Input value={this.state.tel} onChange={this.onChangeValue.bind(this, "tel")} ref="tel"
                             placeholder="座机号"/></Col>
        <Col span="8"><Input value={this.state.tel_split} onChange={this.onChangeValue.bind(this, "tel_split")}
                             ref="tel_split"
                             placeholder="分机号"/></Col>
      </InputGroup>
      {this.state.error ?
        <span className="ant-form-explain explain-strong">{this.state.error}</span>
        : null}

    </div>)
  }

}
