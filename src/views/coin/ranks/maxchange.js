import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Card, List,Avatar,Icon,Input, Row, Col, Checkbox, Radio, DatePicker, Button, Form, Select} from 'antd';
import {Link} from 'react-router';
import CompaniesIndex from './list';
import {getAllCoins} from '../../../reducers/actions/coin/companies';
import Search from "./search";
import {push} from 'react-router-redux';
import _ from "lodash";
class MaxChangeIndex extends Component {
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
      this.props.getCompanies(params);
    } else {
      this.props.getCompanies({per_page: DEFAULT_PER_PAGE});
    }
  }

  clearForm(e) {
    e.preventDefault();
    this.props.form.resetFields()
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.location.query, this.props.location.query)) {
      this.props.getCompanies(nextProps.location.query);
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
            {/*<Search {...this.props} pathname={this.props.location.pathname}></Search>*/}
          </div>
        </div>
        <h2 className="right_title">市场 <Input.Search  style={{width: 200}} onSearch={(value) => {
          this.onKeywordSearch(value)
        }} placeholder="输入关键词"/>
          <span className="right_txt">共计：{data.meta.total_count}条数据 最近更新：{data.latest_updated_at}</span>
        </h2>
        <CompaniesIndex {...this.props} data={data}></CompaniesIndex>
      </div>
    );
  }
}


//redux
function mapStateToProps(state) {
  return {
    dashData: state.coin_companies.dashData,
    data: state.coin_companies.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCoins: (params) => dispatch(getAllCoins(params)),
    pushQuery: (params) => {
      dispatch(push(params))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MaxChangeIndex);
