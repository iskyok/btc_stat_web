import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Card, Row, Col, Checkbox, Radio, DatePicker, Button, Form, Select} from 'antd';
import {getStatCompanies} from '../../../reducers/actions/stat/company';
import Search from "./search";
import {push} from 'react-router-redux';
class StatCompanyIndex extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let params=this.props.location.query||{};
    this.props.getStatCompanies(params);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.location.query,this.props.location.query)) {
      this.props.getStatCompanies(nextProps.location.query);
    }
  }
  render() {
    let {data} = this.props;
    let company=data.company;
    // console.log("ddd======", company)
    return (
      <div>
          <div className="ant-advanced-search-form">
            <Search {...this.props}></Search>
          </div>
          <div className="ant-advanced-search-form">
            <Row className="vertical_card_list" style={{marginBottom: "10px"}}>
              <div className="item">
                <span className="title">总销售额</span><span className="content">{company.shop_trades_amount}</span>
              </div>
              <div className="item">
                <span className="title">用户人数</span><span className="content">{company.users_count}</span>
              </div>
              <div className="item">
                <span className="title">管家数</span><span className="content">{company.mind_users_count}</span>
              </div>
              <div className="item">
                <span className="title">厂家数</span><span className="content">{company.mind_shops_count}</span>
              </div>
            </Row>
            <Row className="vertical_card_list" style={{marginBottom: "10px"}}>
              <div className="item">
                <span className="title">总商品数</span><span className="content">{company.products_count}</span>
              </div>
              <div className="item">
                <span className="title">订单数</span><span className="content">{company.shop_trades_count}</span>
              </div>
            </Row>
        </div>
      </div>
    );
  }
}
//redux
function mapStateToProps(state) {
  return {
    data: state.stat_companies.data
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getStatCompanies: (params) => dispatch(getStatCompanies(params)),
    pushQuery: (params) => {
      dispatch(push(params));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatCompanyIndex);
