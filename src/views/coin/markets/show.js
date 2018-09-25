import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Card,Rate, Tag, Input, Row, Col, Checkbox, Radio, DatePicker, Button, Form, Select} from 'antd';
import {renderPercentTxt,renderPercentTag} from '../../../utils/helper';
import {Link} from 'react-router';
import CoinsIndex from './list';
import {getMarket,getCoinMarkets} from '../../../reducers/actions/coin/markets';
import Search from "./search";
import ExchangeIndex from "./exchange_index";
import {push} from 'react-router-redux';
import _ from "lodash";
const gridStyle = {
  width: '25%',
  textAlign: 'left',
  height: 80
};

class MarketShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayTrade: 0,
      todayUser: 0
    };
  }

  componentDidMount() {
    let params = this.props.params;
    console.log("kkkkkkk==========", params.id)
    this.props.getMarket(params.id);
    this.props.getCoinMarkets(params.id)
  }

  clearForm(e) {
    e.preventDefault();
    this.props.form.resetFields()
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.location.query, this.props.location.query)) {
      this.props.getCoin(nextProps.location.query);
    }
  }

  // 选择日期范围
  dateChange(value1, value2) {
    this.setState({start_date: value2[0]});
    this.setState({end_date: value2[1]});
  }


  renderTitle(data) {
    return <div className="coin_header">
      <div className="namePrice item">
        <h1>{data.name}</h1>
        <div className="coinprice"> {data.curr_price_cny}
          {renderPercentTag(data.curr_hour24_up)}
        </div>
      </div>
      <div className="lowHeight item">
        <div>24小时平台成交额：<span className="value">{data.amount24}</span></div>
        <div><Rate value={data.star}/></div>
      </div>
      <div className="lowHeight item">
        <div>排名：<span className="value">{data.curr_hour24_up}</span></div>
        <div>官网：<span className="value">{data.webstie}</span></div>
      </div>
      <div className="lowHeight item">
        <div>国家：<span className="value">{data.country_name}</span></div>
      </div>
    </div>
  }

  render() {
    let {data, dashData} = this.props;
    console.log("ddd======", data, this.props)
    return (
      <div className="coin_show">
        <Card>
          {this.renderTitle(data)}
        </Card>
        <Card>
          {data.desc}
        </Card>
        <ExchangeIndex {...this.props} data={this.props.coinMarketsData}></ExchangeIndex>
      </div>
    );
  }
}


//redux
function mapStateToProps(state) {
  return {
    dashData: state.coin_coins.dashData,
    data: state.coin_markets.itemData,
    filterData: state.coin_coins.filterData,
    coinMarketsData: state.coin_markets.coinMarketsData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCoin: (id) => dispatch(getCoin(id)),
    getDashCoins: (params) => dispatch(getDashCoins(params)),
    getCoinFilters: (params) => dispatch(getCoinFilters(params)),
    getMarket: (id) => dispatch(getMarket(id)),
    getCoinMarkets: (id,params) => dispatch(getCoinMarkets(id,params)),
    pushQuery: (params) => {
      dispatch(push(params))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketShow);
