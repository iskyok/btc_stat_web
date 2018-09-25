import React, {component} from 'react';
import {Form, Input, DatePicker, Checkbox, Row, Col, Select, Button} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
import {connect} from 'react-redux';
import {getLevel} from '../../../reducers/actions/fx/levels';
import {PAGE_CATEGORY} from '../../../constants/actionTypes'

let Search = React.createClass({
  getInitialState() {
    return {start_date: "", end_date: ""};
  },
  // 选择日期范围
  // dateChange(value1, value2) {
  //   this.setState({start_date: value2[0]});
  //   this.setState({end_date: value2[1]});
  // },

  handleSubmit(e) {
    e.preventDefault();
    console.log('搜索表单值：', this.props.form.getFieldsValue());
    let params = this.props.form.getFieldsValue();
    params["where"] = params["where"] || {}
      params["where"]["created_at"] = {};
      params["where"]["created_at"]["gteq"] = params["created_at"][0].format("YYYY-MM-DD hh:mm");
      params["where"]["created_at"]["lteq"] = params["created_at"][1].format("YYYY-MM-DD hh:mm");
    console.log("xxxxx",params)

    this.setState({query: params})
    this.props.indexPage.props.getLevels(params);
  },

  clearForm(e) {
    e.preventDefault();
    console.log("eeee", this.refs.datePicker)
    this.refs.datePicker.initialValue=null
    this.setFieldsValue({dateValue: null});
    this.props.form.resetFields()
  },
  componentDidMount() {
  },

  render() {
    const {getFieldProps,getFieldDecorator} = this.props.form;
    const categroyOptions = _.map(PAGE_CATEGORY, function (item) {
      return (<Option key={item.id}>{item.name}</Option>)
    })
    categroyOptions.unshift(<Option key=" ">全部</Option>);
    return (
        <Form horizontal className="ant-advanced-search-form">
          <Row gutter={16}>

            <Col sm={8}>
              <FormItem id="tag" label="id" labelCol={{span: 6}} wrapperCol={{span: 14}}>
                <Input  style={{width: '100%'}} {...getFieldProps('where.id',)} placeholder="">
                </Input>
              </FormItem>
            </Col>
            <Col sm={8}>
              <FormItem id="tag" label="创建时间" labelCol={{span: 6}} wrapperCol={{span: 14}}>
                {getFieldDecorator('created_at',{defaultValue: "null"})(
                  <RangePicker/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12} offset={12} style={{textAlign: 'right'}}>
              <Button type="primary" onClick={this.handleSubmit}>搜索</Button>
              <Button onClick={this.clearForm.bind(this)}>清除条件</Button>
            </Col>
          </Row>
        </Form>
    )
  }
})


//===== redux动作 ===
function mapStateToProps(state) {
  return {
    tagsData: state.fx_levels.data.levels
  };
}
function mapDispatchToProps(dispatch) {
  return {
        getLevel: (params) => dispatch(getLevel(params))
  }
}
Search = Form.create()(Search);

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(Search);
