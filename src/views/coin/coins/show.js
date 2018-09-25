import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Card, Tag, Input, Row, Col, Checkbox, Radio, DatePicker, Button, Form, Select} from 'antd';
import {renderPercentTxt, renderPercentTag, renderTextPlacehold} from '../../../utils/helper';
import {Link} from 'react-router';
import CoinsIndex from './list';
import {getDashCoins, getCoin, getCoinFilters, getCoinMarkets} from '../../../reducers/actions/coin/coins';
import Search from "./search";
import ExchangeIndex from "./exchange_index";
import {push} from 'react-router-redux';
import _ from "lodash";
const gridStyle = {
  width: '25%',
  textAlign: 'left',
  height: 80
};

class CoinCoinsShow extends Component {
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
    this.props.getCoin(params.id);
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


  renderIcoPrice(data) {
    return data.ico_price_cny ?
      <span>¥{data.ico_price_cny}<Tag className="tags-ico" color="green">{data.curr_ico_times + "倍"}</Tag></span> : "无"
  }

  renderTitle(data) {
    return <div className="coin_header">
      <div>
        <div className="namePrice item">
          <h1>{data.full_name}</h1>
          <div className="coinprice"> {data.curr_price_cny}
            {renderPercentTag(data.curr_hour24_up)}
          </div>
        </div>
        {/*<div className="lowHeight item">*/}
        {/*<div>24H最高：<span className="value">{data.curr_hour24_up}</span></div>*/}
        {/*<div>24H最低：<span className="value">{data.curr_hour24_up}</span></div>*/}
        {/*</div>*/}
        <div className="marketValue item">
          <div>流通市值：<span className="value">{data.curr_market_value_cny}</span></div>
          <div>24H成交额：<span className="value">{data.trade24_amount_cny}</span></div>
        </div>
        <div className="marketValue item">
          <div>流通量：<span className="value">
          {data.curr_trade_count}{data.current_trade_per ? "(" + data.current_trade_per + "%)" : ""}
        </span></div>
          <div>总发行量：<span className="value">{data.curr_trade_volume}</span></div>
        </div>
      </div>
      <div className="summary">{data.summary}</div>
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
        {/*{this.renderTitle(data)}*/}
        <Card className="coin_price_section" title={false} bordered={false}>
          <Card.Grid style={gridStyle}>
            <span className="tit">最高涨幅(较发行)：</span>
            <span className="value">{renderPercentTxt(data.max_up_per)}</span>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <span className="tit">当前价涨幅(较发行)：</span>
            <span className="value">{renderPercentTxt(data.curr_up_per)}</span>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <span className="tit">发行价：</span>
            <span className="value">{data.pub_price_cny}</span>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <span className="tit">众筹价：</span>
            <span className="value">{this.renderIcoPrice(data)}</span>
          </Card.Grid>
        </Card>
        <Card className="coin_main" title={false} bordered={false}>
          <Card.Grid style={gridStyle}>
            <span className="tit">英文名：</span>
            <span className="value">{data.name_en}</span>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <span className="tit">中文名：</span>
            <span className="value">{data.name_zh}</span>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <span className="tit">国家：</span>
            <span className="value">{renderTextPlacehold(data.country_name)}</span>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <span className="tit">上架交易所：</span>
            <span className="value">{data.on_market_count}</span>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <span className="tit">发行时间：</span>
            {data.pub_at ?
              <span className="value">{data.pub_at}</span> : <span>无</span>}
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <span className="tit">白皮书：</span>
            <span className="value">
              {data.white_paper ? <a href={data.white_paper} target="_blank">白皮书</a> : "无"}
            </span>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <span className="tit">官网：</span>
            {data.website ?
              <span className="value">
                 <a href={data.website} target="_blank">站点1</a>,
                <a href={data.website2} target="_blank">站点2</a></span> : <span>无</span> }
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <span className="tit">区块站：</span>
            {data.explorer_site ? <span className="value">
              <a href={data.explorer_site} target="_blank">{data.explorer_site}</a>,
            </span> : <span>无</span> }
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <span className="tit">是否代币：</span>
            <span className="value">{data.is_proxy ? "是" : "否"}</span>
          </Card.Grid>
        </Card>
        <Card >
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
    data: state.coin_coins.itemData,
    filterData: state.coin_coins.filterData,
    coinMarketsData: state.coin_coins.coinMarketsData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCoin: (id) => dispatch(getCoin(id)),
    getDashCoins: (params) => dispatch(getDashCoins(params)),
    getCoinFilters: (params) => dispatch(getCoinFilters(params)),
    getCoinMarkets: (id, params) => dispatch(getCoinMarkets(id, params)),
    pushQuery: (params) => {
      dispatch(push(params))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinCoinsShow);
