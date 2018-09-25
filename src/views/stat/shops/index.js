import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Card, Row, Col, Checkbox, Radio, DatePicker, Button, Form, Select} from 'antd';
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const RadioButton = Radio.Button;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
import {Link} from 'react-router';
import ProductsIndex from './list';
import {getStatDashProducts, getStatProducts} from '../../../reducers/actions/stat/products';

class StatProductsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayTrade: 0,
      todayUser: 0
    };
  }

  componentDidMount() {
    // this.props.getStatDashProducts({});
    this.props.getStatProducts({});
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('搜索表单值：', this.props.form.getFieldsValue());
    let params = this.props.form.getFieldsValue();
    params["where"] = params["where"] || {}
    if (this.state.start_date) {
      params["where"]["created_at"] = {};
      params["where"]["created_at"]["gteq"] = this.state.start_date;
      params["where"]["created_at"]["lteq"] = this.state.end_date;
    }

    this.setState({query: params})
    this.props.indexPage.props.get(params);
  }

  clearForm(e) {
    e.preventDefault();
    this.props.form.resetFields()
  }

  // 选择日期范围
  dateChange(value1, value2) {
    this.setState({start_date: value2[0]});
    this.setState({end_date: value2[1]});
  }

  //同期对比
  onCompareChange() {

  }

  convertProvinceData(data) {
    let result = data.map((item) => {
      return {name: item.province, value: item.count}
    })
    return result
  }

  convertUpchartData(data) {
    var result = {}
    data.map((item) => {
      return result[item.date] = item.increase_count
    })
    console.log("rrrrr---", result)
    return result
  }

  render() {
    let {data, dashData} = this.props;
    console.log("ddd======",data)
    return (
      <div>
        <div class="">
          <div className="ant-advanced-search-form">
            <Form inline onSubmit={this.handleSubmit.bind(this)}>
              <FormItem label="">
                <RadioGroup defaultValue="a" size="large">
                  <RadioButton value="a">最近7天</RadioButton>
                  <RadioButton value="b">最近14天</RadioButton>
                  <RadioButton value="c">最近30天</RadioButton>
                </RadioGroup>
              </FormItem>
              <FormItem wrapperCol={{span: 14}}>
                <RangePicker onChange={this.dateChange.bind(this)}/>
              </FormItem>

              <FormItem className="actions">
                <Button type="primary" size="large" onClick={this.handleSubmit}>搜索</Button>
                <Button size="large" onClick={this.clearForm}>清除条件</Button>
              </FormItem>
            </Form>
          </div>
          <div className="ant-advanced-search-form">
            <Row className="vertical_card_list" style={{marginBottom: "10px"}}>
              <div className="item">
                <span className="title">总订单数</span><span className="content">{dashData.shop_trades_count}</span>
              </div>
              <div className="item">
                <span className="title">总用户人数</span><span className="content">{dashData.users_count}</span>
              </div>
              <div className="item">
                <span className="title">管家数</span><span className="content">{dashData.mind_users_count}</span>
              </div>
              <div className="item">
                <span className="title">厂家数</span><span className="content">{dashData.mind_shops_count}</span>
              </div>
            </Row>
          </div>
          {/*<Row className="vertical_card_list" style={{marginBottom: "10px"}}>*/}
          {/*/!*<div className="item">*!/*/}
          {/*/!*<span className="title">购票用户</span><span className="content">{data.active_user}</span>*!/*/}
          {/*/!*</div>*!/*/}
          {/*<div className="item">*/}
          {/*<span className="title">取消率</span><span className="content">{data.cancel_point}</span>*/}
          {/*</div>*/}
          {/*<div className="item">*/}
          {/*<span className="title">总用户</span><span className="content">{data.cumulate_user}</span>*/}
          {/*</div>*/}
          {/*<div className="item">*/}
          {/*<span className="title">历史累计用户</span><span className="content">{data.history_count}</span>*/}
          {/*</div>*/}
          {/*</Row>*/}
        </div>
        <h2 className="right_title">商品销售</h2>
         <ProductsIndex data={data}></ProductsIndex>
        {/*<UpChart data={this.convertUpchartData(data.dates)}></UpChart>*/}
        {/*<h2 className="right_title">用户属性</h2>*/}
        {/*<Row>*/}
        {/*<Col span={12}><SexChart data={data.user_list_sex}/></Col>*/}
        {/*<Col span={12}><CityDistribute data={this.convertProvinceData(data.area_list)}/>*/}
        {/*</Col>*/}
        {/*</Row>*/}
      </div>
    );
  }
}


//redux
function mapStateToProps(state) {
  return {
    dashData: state.stat_products.dashData,
    data: state.stat_products.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getStatProducts: (params) => dispatch(getStatProducts(params)),
    getStatDashProducts: (params) => dispatch(getStatDashProducts(params))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatProductsIndex);
