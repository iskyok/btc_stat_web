import React, {component} from 'react';
import {Form, Input, DatePicker, Checkbox, Row, Col, Select, Button} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
import {connect} from 'react-redux';
import {getUsers} from '../../../reducers/actions/fx/users';
import {PAGE_CATEGORY} from '../../../constants/actionTypes'

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
    console.log('搜索表单值：', this.props.form.getFieldsValue());
    let params = this.props.form.getFieldsValue();
    if (this.state.start_date) {
      params["created_at"] = {};
      params["created_at"]["gteq"] = this.state.start_date;
      params["created_at"]["lteq"] = this.state.end_date;
    }

    this.props.getUsers(params)
  },

  clearForm(e) {
    e.preventDefault();
    this.props.form.resetFields()
  },
  componentDidMount() {
  },

  render() {
    const {getFieldProps} = this.props.form;
    const categroyOptions = _.map(PAGE_CATEGORY, function (item) {
      return (<Option key={item.id}>{item.name}</Option>)
    })
    categroyOptions.unshift(<Option key=" ">全部</Option>);
    return (
        <Form horizontal className="ant-advanced-search-form">
          <Row gutter={16}>
            <Col sm={8}>
              <FormItem id="category_item" label="用户" labelCol={{span: 6}} wrapperCol={{span: 14}}>
                <Input defaultValue=" " placeholder="用户名或完整手机号"  {...getFieldProps('keyword', {initialValue: ''})}
                        style={{width: 200}}>
                </Input>
              </FormItem>
            </Col>
            <Col sm={8}>
            </Col>
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
    tagsData: state.fx_users.data.users
  };
}
function mapDispatchToProps(dispatch) {
  return {
        getUsers: (params) => dispatch(getUsers(params))
  }
}
Search = Form.create()(Search);

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(Search);
