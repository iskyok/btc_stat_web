import React, {component} from 'react';
import {Form, Input, DatePicker, Checkbox, Row, Col, Select, Button} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
import {connect} from 'react-redux';
import { getTeams} from '../../../reducers/actions/company/teams';

let Search = React.createClass({
  getInitialState() {
    return {start_date: "", end_date: ""};
  },
  // 选择日期范围
  dateChange(value1, value2) {
    this.setState({start_date: value2[0]});
    this.setState({end_date: value2[1]});
  },

  handleSubmit(e) {
    e.preventDefault();
    let params = this.props.form.getFieldsValue();
    //params["where"] = params["where"] || {}
    if (this.state.start_date) {
      //params["created_at"] = {};
      params["created_at_gteq"] = this.state.start_date;
      params["created_at_lteq"] = this.state.end_date;
    }

    this.setState({query: params})
    console.log("data: 搜索参数",params)
    var old_params = this.props.location.query || {};
    let query = Object.assign({},old_params,params, {page: 1});
    this.props.pushQuery({
      pathname: this.props.location.pathname,
      query: query
    })
    if(this.props.onSubmit){
      this.props.onSubmit(params)
    }
  },

  clearForm(e) {
    e.preventDefault();
    this.props.form.resetFields()
  },
  componentDidMount() {
  },

  render() {
    const {getFieldProps} = this.props.form;
    var params = this.props.location.query || {};
    console.log("oooo=====",params)
    const categroyOptions = _.map({}, function (item) {
      return (<Option key={item.id}>{item.name}</Option>)
    })
    categroyOptions.unshift(<Option key=" ">全部</Option>);
    return (
      <Form horizontal className="ant-advanced-search-form">
        <Row gutter={16}>
          <Col sm={8}>
            <FormItem id="tag" label="名称" labelCol={{span: 6}} wrapperCol={{span: 14}}>
              <Input defaultValue=""  {...getFieldProps('name', {initialValue: ''})}/>
            </FormItem>
          </Col>
          {/*<Col sm={8}>*/}
            {/*<FormItem id="category_item" label="大类" labelCol={{span: 6}} wrapperCol={{span: 14}}>*/}
              {/*<Select id="category_select" size="large"*/}
                      {/*defaultValue=" "  {...getFieldProps('where.category_id', {initialValue: ''})}*/}
                      {/*style={{width: 200}}>*/}
                {/*{categroyOptions}*/}
              {/*</Select>*/}
            {/*</FormItem>*/}
          {/*</Col>*/}
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


//===== redux动作 ===
function mapStateToProps(state) {
  return {
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getTeams: (params) => dispatch(getTeams(params))
  }
}
Search = Form.create()(Search);

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(Search);
