import React, {component} from 'react';
import {Form, Input, DatePicker, Checkbox, Row, Col, Select, Button} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

let Search = React.createClass({
  getInitialState() {
    return {from_date: "", to_date: ""};
  },
  // 选择日期范围
  dateChange(value1, value2) {
    this.setState({from_date: value2[0]});
    this.setState({to_date: value2[1]});
  },

  handleSubmit(e) {
    e.preventDefault();
    let params = this.props.form.getFieldsValue();
    console.log("data: 搜索参数",params)
    if (this.state.from_date) {
      params["from_date"] = this.state.from_date;
      params["to_date"] = this.state.to_date;
    }

    let allParams = Object.assign({}, this.props.location.query || {}, {...params}, {page: 1});
    //清除空值
    allParams = _.omitBy(allParams, (value) => {
      return value == ""
    });
    this.props.pushQuery({
      pathname: this.props.location.pathname,
      query: allParams
    })
    this.setState({query: params})
  },

  clearForm(e) {
    e.preventDefault();
    this.props.form.resetFields()
  },
  componentDidMount() {
  },

  render() {
    const {getFieldProps} = this.props.form;
    const categroyOptions = _.map({}, function (item) {
      return (<Option key={item.id}>{item.name}</Option>)
    })
    categroyOptions.unshift(<Option key=" ">全部</Option>);
    return (
      <Form horizontal className="ant-advanced-search-form">
        <Row gutter={16}>
          {/* <Col sm={8}>
            <FormItem id="tag" label="名称" labelCol={{span: 6}} wrapperCol={{span: 14}}>
              <Input defaultValue=" "  {...getFieldProps('name', {initialValue: ''})}/>
            </FormItem>
          </Col>*/}
          <Col sm={8}>
            <FormItem id="tag" label="创建时间" labelCol={{span: 6}} wrapperCol={{span: 14}}>
              <RangePicker onChange={this.dateChange.bind(this)}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={12} style={{textAlign: 'right'}}>
            <Button type="primary" onClick={this.handleSubmit}>搜索</Button>
            <Button onClick={this.clearForm}>清除条件</Button>
          </Col>
        </Row>
      </Form>
    )
  }
})


Search = Form.create({
  mapPropsToFields(props) {
    let result = {};
    let query = props.location.query || {};
    // result["name"] = {value: query["name"]};
    // result["real_name"] = {value: query["real_name"]};
    result["phone"] = {value: query["phone"]};
    return result;
  }
})(Search);

export default Search;
