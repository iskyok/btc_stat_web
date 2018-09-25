import React, {component} from 'react';
import {Form, Radio, Input, DatePicker, Checkbox, Row, Col, Select, Button} from 'antd';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
import {connect} from 'react-redux';
import {getStatCompanies} from '../../../reducers/actions/stat/company';
import {getDateRange} from '../../../utils/helper';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
import {push} from 'react-router-redux';

let Search = React.createClass({
  getInitialState() {
    return {
      modeType: 0,
      dateRangeMode: "latest_week",
      start_date: "", end_date: "",
      dateRange: null
    };
  },

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.location.query, this.props.location.query)) {
      this.props.getStatCompanies(nextProps.location.query);
    }
  },
  // 选择日期范围
  dateChange(value1, value2) {
    this.setState({dateRange: value1});
  },

  handleSubmit(e) {
    e.preventDefault();
    let params = this.props.form.getFieldsValue() || {};
    if (this.state.dateRange && this.state.dateRange.length > 1) {
      params["from_date"] = this.state.dateRange[0].format("YYYY-MM-DD");
      params["to_date"] = this.state.dateRange[1].format("YYYY-MM-DD");
    }
    let Params = this.props.location.query || {};
    params = Object.assign({}, Params, params);
    // console.log("data: 搜索参数22", params);
    this.props.pushQuery({
      pathname: this.props.location.pathname,
      query: params
    });
    this.props.getStatCompanies(params);
  },

  clearForm(e) {
    e.preventDefault();
    this.props.form.resetFields();
    this.setState({dateRangeMode: []});
    this.setState({dateRange: []});
    this.props.pushQuery({
      pathname: this.props.location.pathname,
      query: {}
    });
  },
  onDayRangeChange(e) {
    let dayType = e.target.value;
    let range = getDateRange(dayType);
    this.setState({dateRangeMode: dayType});
    this.setState({dateRange: range});
  },
  render() {
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
        <Row>
          <Col span={12} offset={12} style={{textAlign: 'right'}}>
            <Button type="primary" onClick={this.handleSubmit}>搜索</Button>
            <Button onClick={this.clearForm}>清除条件</Button>
          </Col>
        </Row>
      </Form>
    );
  }
});
function mapDispatchToProps(dispatch) {
  return {
    getStatCompanies: (params) => dispatch(getStatCompanies(params)),
    pushQuery: (params) => {
      dispatch(push(params));
    }
  };
}

Search = Form.create({withRef: true})(Search);

export default connect(null, mapDispatchToProps, null, {withRef: true})(Search);
