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
    this.state = {
      data: this.props.data
    };
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    const {data} = this.state;
    this.initCharts(data || []);
    console.log("eeeee----",_.keys(data))
  }

  componentWillReceiveProps(nextProps){
     if(this.props.data!=nextProps.data){
       this.setState({data: nextProps.data})
     }
  }

  initCharts(CharData) {
    if (CharData.length == 0) {
    } else {
      let myChart = echarts.init(document.getElementById('vist_chart'),'macarons');
      myChart.setOption({
        title: {},
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          // data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
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
            data: _.keys(CharData)
          }
        ],
        yAxis: [
          {
            type: 'value'
          }

        ],
        series:  {
          "name":"人数：",
          "type":"line",
          "data":  _.values(CharData)
        }
      })
    }
  }

  handleChange() {

  }



  render() {
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
