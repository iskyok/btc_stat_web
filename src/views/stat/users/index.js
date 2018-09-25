import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Card, Row, Col, Checkbox, Radio, DatePicker, Button, Form, Select} from 'antd';
import {Link} from 'react-router';
import UpChart from './up_chart';
import Search from './search';
import {getStatUserIndex, getStatDashUser} from '../../../reducers/actions/stat/user';
import {push} from 'react-router-redux'

class StatUserIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayTrade: 0,
      todayUser: 0
    };
  }

  componentDidMount() {
    this.props.getStatUserIndex();
  }

  handleSubmit() {
    // e.preventDefault();
    console.log("uuuu====", this)
    // console.log('搜索表单值：', this.props.form.getFieldsValue());
    let params = this.props.form.getFieldsValue();
    // params["where"] = params["where"] || {}
    // if (this.state.start_date) {
    //   params["where"]["created_at"] = {};
    //   params["where"]["created_at"]["gteq"] = this.state.start_date;
    //   params["where"]["created_at"]["lteq"] = this.state.end_date;
    // }

    this.setState({query: params})
    console.log("sss====", params)
    this.props.getStatUserIndex(params);
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
        <h2 className="right_title">用户增长</h2>

        <UpChart data={this.convertUpchartData(data.dates)}></UpChart>
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
    data: state.stat_users.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getStatUserIndex: (params) => dispatch(getStatUserIndex(params)),
    pushQuery: (params)=>{
      dispatch(push(params))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatUserIndex);
