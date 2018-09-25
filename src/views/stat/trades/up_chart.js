import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {getEcharts} from '../../../reducers/actions/echarts';
import {Card, Row,Col, Checkbox, Radio, DatePicker, Button, Form, Select} from 'antd';
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const RadioButton = Radio.Button;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import echarts from 'echarts';
require('echarts/theme/macarons');
const RangePicker = DatePicker.RangePicker;


export class UpChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    const {data} = this.props;
    console.log("dddd1111-----",data)
    this.initCharts(data || []);
    console.log("eeeee----",_.keys(data))
  }

  initCharts(CharData) {
    if (CharData.length == 0) {
    } else {
      let myChart = echarts.init(document.getElementById('vist_chart'),'macarons');
      let xData= _.map(CharData,(item)=>{return item.date});
      console.log("ddd-----222",xData)
      let seriesCountData= _.map(CharData,(item)=>{return item.trades_count});
      let seriesAmountData= _.map(CharData,(item)=>{return parseInt(item.trades_amount)});
      myChart.setOption({
        title: {},
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['订单金额','订单数']
        },
        toolbox: {
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: xData
          }
        ],
        yAxis: [
          {
            type: 'value'
          }

        ],
        series:  [
          {
            "name":"订单金额",
            "type":"line",
            "data": seriesAmountData
          },{
            "name":"订单数",
            "type":"line",
            "data":  seriesCountData
          }]
      })
    }
  }

  handleChange() {

  }


  render() {
    let { title } = this.props
    const options = [
      {label: '对比前一日', value: 'Apple'},
      {label: '对比上周同期', value: 'Pear'}
    ];
    //生成 Charts 图表
    let styles = {
      root: {
        width: "100%",
        minWidth: "600px",
        height: "240px",
        backgroundColor: '#f9f9f9',
        margin: "0 auto",
        marginTop: "20px"
      }
    }
    return (
      <div>
        {title ? <h2 className="right_title ml15">{title}</h2> : null}
        <div className="echarts_inner">

          {/*<div className="toolbar">*/}
            {/*<Row>*/}
              {/*<Col span={8}>*/}
                {/*用户增长趋势图*/}
              {/*</Col>*/}
              {/*<Col span={8}>*/}
              {/*</Col>*/}
            {/*</Row>*/}
          {/*</div>*/}

          <div style={styles.root} id='vist_chart'></div>
        </div>
      </div>
    );
  }
}

export default UpChart;
