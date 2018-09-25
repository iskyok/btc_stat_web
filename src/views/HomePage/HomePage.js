import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import { Row } from 'antd';
import {Link} from 'react-router';
import { getBusiness,getSurvey,getHomeHeader } from '../../reducers/actions/home';
import UpChart from '../stat/trades/up_chart';
import {getStatTrades} from '../../reducers/actions/stat/trades';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayTrade: 0,
      todayUser:0
    };
  }


  componentDidMount() {
//获取COOKIE中，shopid的值，就是点击的那个
    this.props.getStatTrades({dateRangeMode:"latest_week",dateMode:2})
    this.props.getSurvey();
    this.props.getHomeHeader();



    let shopId = localStorage.getItem('shop_id')
    //获取该ID的 对应商家的信息
    if (shopId){
      this.props.getBusiness(shopId);
    }
  }
  HomeUnit(){

  }

  render() {
    const Number = this.props.headerData
    // const Number = this.props.itemData
    // console.log(Number,"itemData 商家信息")
    return(
      <div>
        <div>
          <p className="business_info">
            {this.props.itemData.name || "没有商家"}
            {/*<span*/}
              {/*className="business_info_special business_info_state"*/}
              {/*style={{"backgroundColor": this.props.itemData.status_name == "未审核" ? "#ffffff" : "red",*/}
              {/*}}*/}
            {/*>{this.props.itemData.status_name || "没有审核状态"}</span>*/}
            {/*<span*/}
              {/*className="business_info_special"*/}
              {/*style={{"backgroundColor": this.props.itemData.status_name == "已审核" ? "#999999" : "red",*/}
              {/*}}*/}
            {/*>{this.props.itemData.status_name || "没有审核状态"}</span>*/}
          </p>
        </div>
        <Row className="vertical_card_list mt15" style={{marginBottom: "10px"}}>
          <div className="item">
            <Link to={'/company/stat/trades'} style={{marginBottom:"20px"}}>
              <span className="content">
              {/*<p className="number">{Number.waiting_for_delivery}</p>*/}
                 <p className="number">
                   {Number.ship_count}
                 </p>
              </span>
              <span className="title">待发货订单</span>
            </Link>
          </div>
          <div className="item">
            {/*<Link to={'/company/trade/units'} style={{marginBottom:"20px"}}>*/}
            <div style={{marginBottom:"20px"}}>
              <span className="content">
                 {/*<p className="number">{Number.after_sale}</p>*/}
                 <p className="number">
                   {Number.return_count}
                   </p>
              </span>
              <span className="title">待售后订单</span>
            </div>
            {/*</Link>*/}
          </div>

          <div className="item">
            <div style={{marginBottom:"20px"}}>
              <span className="content">
               {/*<p className="number">{Number.yesterday_order}</p>*/}
               <p className="number">
                 {Number.ytd_count}
                 </p>
              </span>
              <span className="title">昨日订单</span>
            </div>
          </div>
          <div className="item">
            <div style={{marginBottom:"20px"}}>
              <span className="content">
               {/*<p className="number">￥{Number.yesterday_a_turnover}</p>*/}
               <p className="number">
                 ￥{Number.income_price}
                 </p>
              </span>
              <span className="title">总分公司收益</span>
          </div>
          </div>
          <div className="item">
            <div style={{marginBottom:"20px"}}>
              <span className="content">
               {/*<p className="number">￥{Number.total}</p>*/}
               <p className="number">
                 ￥{Number.sum_price}
                 </p>
              </span>
              <span className="title">厂家销售总成交额</span>
            </div>
          </div>

        </Row>
        <div className="echarts_content">
              {/*<EchartsShow />*/}
          <UpChart title={"七日订单趋势"} data={this.props.formData.dates}></UpChart>
        </div>
      </div>
  );
  }
}
//
// HomePage.propTypes = {
//
// };

//redux
function mapStateToProps(state) {
  return {
    data: state.home.data,
    itemData: state.home.itemData,
    formData: state.stat_trades.data,
    surveyData: state.home.surveyData,
    headerData: state.home.headerData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBusiness: (id) => dispatch(getBusiness(id)),
    getStatTrades: (params) => dispatch(getStatTrades(params)),
    getSurvey: (params) => dispatch(getSurvey(params)),
    getHomeHeader: (params) => dispatch(getHomeHeader(params)),
    clearItemData: ()=>dispatch({type: "clearBusinessSuccess"})
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
