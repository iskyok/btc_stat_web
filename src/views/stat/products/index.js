import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Card, Row, Col, Checkbox, Radio, DatePicker, Button, Form, Select} from 'antd';
import {Link} from 'react-router';
import ProductsIndex from './list';
import {getStatDashProducts, getStatProducts} from '../../../reducers/actions/stat/products';
import Search from "./search";
import {push} from 'react-router-redux';
import _ from "lodash";
class StatProductsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayTrade: 0,
      todayUser: 0
    };
  }

  componentDidMount() {
    //查询
    if (!!this.props.location.query.page){
      let params = undefined;
      params=this.props.location.query
      this.props.getStatProducts(params);
    }else{
      this.props.getStatProducts();
    }
  }

  clearForm(e) {
    e.preventDefault();
    this.props.form.resetFields()
  }

  componentWillReceiveProps(nextProps) {
    if(!_.isEqual(nextProps.location.query , this.props.location.query)){
      this.props.getStatProducts(nextProps.location.query);
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
    console.log("ddd======", data , this.props)
    return (
      <div>
        <div class="">
          <div className="ant-advanced-search-form">
            <Search pathname={this.props.location.pathname}></Search>
          </div>
        </div>
        <h2 className="right_title">商品销售</h2>
        <ProductsIndex {...this.props} data={data}></ProductsIndex>
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
    getStatDashProducts: (params) => dispatch(getStatDashProducts(params)),
    pushQuery: (params)=>{
      dispatch(push(params))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatProductsIndex);
