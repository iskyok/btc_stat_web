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
import UpChart from './up_chart';
import {getStatTrades, getStatDashTrades} from '../../../reducers/actions/stat/trades';
import Search from "./search";

class StatTradesIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayTrade: 0,
      todayUser: 0
    };
  }

  componentDidMount() {
    this.props.getStatTrades({});
    // this.props.getStatDashTrades();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (!_.isEqual(nextProps.location.query, this.props.location.query)) {
  //     console.log("----params", nextProps.location.query)
  //     this.props.getPages(nextProps.location.query)
  //   }
  // }

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
      return result[item.date] = item.trades_count
    })
    console.log("rrrrr---", result)
    return result
  }

  render() {
    let {data, dashData} = this.props;
    console.log("ddddd--------=====", data)
    return (
      <div>
        <div class="">
          <div className="ant-advanced-search-form">
            <Search pathname={this.props.location.pathname}></Search>
          </div>
          {/*<div className="ant-advanced-search-form">*/}
            {/*<Row className="vertical_card_list" style={{marginBottom: "10px"}}>*/}
              {/*<div className="item">*/}
                {/*<span className="title">订单数</span><span className="content">{dashData.trade_count}</span>*/}
              {/*</div>*/}
              {/*<div className="item">*/}
                {/*<span className="title">用户数</span><span className="content">{dashData.user_count}</span>*/}
              {/*</div>*/}
              {/*<div className="item">*/}
                {/*<span className="title">管家数</span><span className="content">{dashData.mind_count}</span>*/}
              {/*</div>*/}
              {/*<div className="item">*/}
                {/*<span className="title">厂商数</span><span className="content">{dashData.shop_count}</span>*/}
              {/*</div>*/}
              {/*/!*<div className="item">*!/*/}
              {/*/!*<span className="title">活跃用户</span><span className="content">{data.cancel_point}</span>*!/*/}
              {/*/!*</div>*!/*/}
            {/*</Row>*/}
          {/*</div>*/}
        </div>
        <h2 className="right_title">订单增长</h2>

        <UpChart data={data.dates}></UpChart>
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
    dashData: state.stat_trades.dashData,
    data: state.stat_trades.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getStatTrades: (params) => dispatch(getStatTrades(params)),
    getStatDashTrades: (params) => dispatch(getStatDashTrades(params))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatTradesIndex);
