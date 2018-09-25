import React, {component} from 'react';
import {Form, Radio, Input, DatePicker, Checkbox, Row, Col, Select, Button} from 'antd';
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
import {getDateRange} from '../../utils/helper';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

let Search = React.createClass({
  getInitialState() {
    return {modeType: 0,
      dateRangeMode: "latest_week",
      dateMode: 2,
      start_date: "", end_date: "", dateRange: null};
  },
  // 选择日期范围
  dateChange(value1, value2) {
    console.log("ddd===", value1)
    this.setState({dateRange: value1});
  },

  handleSubmit(e) {
    e.preventDefault();
    let params = this.props.form.getFieldsValue() || {};

    if (this.state.dateRange && this.state.dateRange.length > 1) {
      params["from_date"] = this.state.dateRange[0].format("YYYY-MM-DD");
      params["to_date"] = this.state.dateRange[1].format("YYYY-MM-DD");
    }
    params["chosen_single"] = this.state.dateMode;

    let allParams = Object.assign({}, this.props.location.query || {}, {...params}, {page: 1});
    //清除空值
    allParams = _.omitBy(allParams, (value) => {
      return value == ""
    });
    console.log("data: 搜索参数22", params)
    this.props.pushQuery({
      pathname: this.props.location.pathname,
      query: allParams
    })
    this.setState({query: params})

  },

  clearForm(e) {
    e.preventDefault();
    this.props.form.resetFields()

    this.props.pushQuery({
      pathname: this.props.location.pathname,
      query: {}
    });
    this.setState({dateRange: []})
  },
  onDayRangeChange(e){
    let dayType = e.target.value;
    let range = getDateRange(dayType);
    this.setState({dateRangeMode: dayType})
    this.setState({dateRange: range})
  },
  onDayModeChange(e){
    let modeType = e.target.value;
    this.setState({dateMode: modeType})
  },
  onSelectChange(data){
    console.log("ssss===", data)
  },
  render() {
    let {companiesData} = this.props;
    const {getFieldProps} = this.props.form;
    const categroyOptions = _.map(companiesData, function (item) {
      return (<Option key={item.id}>{item.name}</Option>)
    })
    //categroyOptions.unshift(<Option key=" ">全部</Option>);
    return (
      <Form horizontal>
        <Row gutter={16}>
          <Col sm={8}>
            <FormItem id="tag" label="创建时间" labelCol={{span: 6}} wrapperCol={{span: 14}}>
              <RangePicker value={this.state.dateRange} allowClear={false} onChange={this.dateChange.bind(this)}/>
            </FormItem>
          </Col>
          <Col sm={8}>
            <FormItem label="快速" labelCol={{span: 6}} wrapperCol={{span: 18}}>
              <RadioGroup value={this.state.dateRangeMode} onChange={this.onDayRangeChange.bind(this)} size="large">
                <RadioButton value="latest_week">最近7天</RadioButton>
                <RadioButton value="latest_month">最近30天</RadioButton>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        {/*<Row gutter={16}>*/}
          {/*<Col sm={8}>*/}
            {/*<FormItem id="category_item" label="分公司" labelCol={{span: 6}} wrapperCol={{span: 14}}>*/}
              {/*<Select id="category_select" size="large"*/}
                      {/*showSearch*/}
                      {/*allowClear*/}
                      {/*defaultValue=" "  {...getFieldProps('company_id', {initialValue: ''})}*/}
                      {/*filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}*/}
              {/*>*/}
                {/*{categroyOptions}*/}
              {/*</Select>*/}
            {/*</FormItem>*/}
          {/*</Col>*/}
          {/*<Col sm={8}>*/}
            {/*<FormItem label="搜索模式" labelCol={{span: 6}} wrapperCol={{span: 18}}>*/}
              {/*<RadioGroup value={this.state.dateMode}  onChange={this.onDayModeChange.bind(this)} size="large">*/}
                {/*<RadioButton value={2}>按天</RadioButton>*/}
                {/*<RadioButton value={1}>按月</RadioButton>*/}
              {/*</RadioGroup>*/}
            {/*</FormItem>*/}
          {/*</Col>*/}
        {/*</Row>*/}
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


Search = Form.create({withRef: true})(Search);

export default Search;
