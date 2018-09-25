import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {Card, Row,Col, Checkbox, Radio, DatePicker, Button, Form, Select} from 'antd';
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const RadioButton = Radio.Button;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import echarts from 'echarts';
require('echarts/map/js/china');
require('echarts/theme/macarons');
// import echarts from 'echarts/lib/chart/map';
const RangePicker = DatePicker.RangePicker;


export class CityDistribute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  componentDidUpdate(){
    const {data} = this.props;
    //生成 Charts 图表
    this.initCharts(data || []);
  }

  initCharts(CharData) {
    if (CharData.length == 0) {
    } else {
      let myChart = echarts.init(document.getElementById('city_distribute'),"macarons");
      console.log("eeeee", CharData)
      myChart.setOption({
        title: {
          text: '区域分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['2016年']
        },
        visualMap: {
          min: 0,
          max: 45000,
          left: '0px',
          top: '50px',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true
        },
        series: {
          "name": "2017",
          "type": "map",
          "mapType": "china",
          "roam": false,
          "label": {
            "normal": {
              "show": false
            },
            "emphasis": {
              "show": true
            }
          },
          "data": CharData
        }
      })
    }
  }

  handleChange() {

  }

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

  render() {
    let cityStyles = {
      root: {
        width: "100%",
        height: "300px",
        backgroundColor: '#f9f9f9',
        margin: "0 auto",
        marginTop: "20px"
      }
    }
    return (
      <div>
        <div className="echarts_inner">
          <div style={cityStyles.root} id='city_distribute'></div>
        </div>
      </div>
    );
  }
}


export default  CityDistribute;
