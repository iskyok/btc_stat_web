import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Card, Input,Row, Col, Checkbox, Radio, DatePicker, Button, Form, Select} from 'antd';
import {Link} from 'react-router';
import CoinsIndex from './list';
import {getDashCoins, getCoins,getCoinFilters} from '../../../reducers/actions/coin/coins';
import {getAllConcepts} from '../../../reducers/actions/coin/concepts';
import Search from "./search";
import {push} from 'react-router-redux';
import _ from "lodash";
class CoinCoinsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayTrade: 0,
      todayUser: 0
    };
  }

  componentDidMount() {
    const DEFAULT_PER_PAGE=50;
    //查询
    if (!!this.props.location.query.page) {
      let params = {};
      params = this.props.location.query
      params["per_page"]=DEFAULT_PER_PAGE
      this.props.getCoins(params);
    } else {
      this.props.getCoins({per_page: DEFAULT_PER_PAGE});
    }
    this.props.getCoinFilters()
    this.props.getAllConcepts()
  }

  clearForm(e) {
    e.preventDefault();
    this.props.form.resetFields()
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.location.query, this.props.location.query)) {
      this.props.getCoins(nextProps.location.query);
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
  onKeywordSearch(value){
    const params = {};

    if(value.length>0){
      params["symbol"]=value;
    }
    this.props.pushQuery({
      pathname: this.props.location.pathname,
      query: params
    });

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
    console.log("ddd======", data, this.props)
    return (
      <div>
        <div class="">
          <div className="ant-advanced-search-form">
            <Search {...this.props} pathname={this.props.location.pathname}></Search>
          </div>
        </div>
        <h2 className="right_title">全部币 <Input.Search style={{width: 200}}  onSearch={(value)=>{this.onKeywordSearch(value)}}  placeholder="输入关键词"/>
          <span className="right_txt">共计：{data.meta.total_count}条数据 最近更新：{data.latest_updated_at}</span>
        </h2>
        <CoinsIndex {...this.props} data={data}></CoinsIndex>
      </div>
    );
  }
}


//redux
function mapStateToProps(state) {
  return {
    dashData: state.coin_coins.dashData,
    data: state.coin_coins.data,
    conceptsData: state.coin_concepts.allData,
    filterData: state.coin_coins.filterData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCoins: (params) => dispatch(getCoins(params)),
    getDashCoins: (params) => dispatch(getDashCoins(params)),
    getCoinFilters: (params) => dispatch(getCoinFilters(params)),
    getAllConcepts: () => dispatch(getAllConcepts()),
    pushQuery: (params) => {
      dispatch(push(params))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinCoinsIndex);
