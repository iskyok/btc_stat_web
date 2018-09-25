import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Card, List,Avatar,Icon,Input, Row, Col, Checkbox, Radio, DatePicker, Button, Form, Select} from 'antd';
import {Link} from 'react-router';
import MarketsIndex from './list';
import {getDashMarkets, getMarkets,getAllCounties} from '../../../reducers/actions/coin/markets';
import Search from "./search";
import {push} from 'react-router-redux';
import _ from "lodash";
class CoinMarketsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayTrade: 0,
      todayUser: 0
    };
  }

  componentDidMount() {
    const DEFAULT_PER_PAGE = 15;
    //查询
    if (!!this.props.location.query.page) {
      let params = {};
      params = this.props.location.query
      params["per_page"] = DEFAULT_PER_PAGE
      this.props.getMarkets(params);
    } else {
      this.props.getMarkets({per_page: DEFAULT_PER_PAGE});
    }
    this.props.getAllCounties()
  }

  clearForm(e) {
    e.preventDefault();
    this.props.form.resetFields()
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.location.query, this.props.location.query)) {
      this.props.getMarkets(nextProps.location.query);
    }
  }

  // 选择日期范围
  dateChange(value1, value2) {
    this.setState({start_date: value2[0]});
    this.setState({end_date: value2[1]});
  }

  //同期对比
  onCompareChange() {

  }

  onKeywordSearch(value) {
    const params = {};

    if (value.length > 0) {
      params["symbol"] = value;
    }
    this.props.pushQuery({
      pathname: this.props.location.pathname,
      query: params
    });

  }

  render() {
    let {data, dashData} = this.props;
    console.log("ddd======", data, this.props)
    const pagination = {
      showSizeChanger: true,
      current: data.meta.current_page,
      total: data.meta.total_count,
      pageSize: data.meta.per_page,
      showTotal: function (total, range) {
        return `共计： ${total}条数据`
      },
      pageSizeOptions: ['1', '15', '20', '40', '100']
    };
    return (
      <div>
        <div class="">
          <div className="ant-advanced-search-form">
            <Search {...this.props} pathname={this.props.location.pathname}></Search>
          </div>
        </div>
        <h2 className="right_title">市场 <Input.Search  style={{width: 200}} onSearch={(value) => {
          this.onKeywordSearch(value)
        }} placeholder="输入关键词"/>
          <span className="right_txt">共计：{data.meta.total_count}条数据 最近更新：{data.latest_updated_at}</span>
        </h2>
        <MarketsIndex {...this.props} data={data}></MarketsIndex>
      </div>
    );
  }
}


//redux
function mapStateToProps(state) {
  return {
    dashData: state.coin_markets.dashData,
    data: state.coin_markets.data,
    countiesData: state.coin_markets.countiesData.contries
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMarkets: (params) => dispatch(getMarkets(params)),
    getDashMarkets: (params) => dispatch(getDashMarkets(params)),
    getAllCounties: (params) => dispatch(getAllCounties(params)),
    pushQuery: (params) => {
      dispatch(push(params))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinMarketsIndex);
