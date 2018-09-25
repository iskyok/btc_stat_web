import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {Card, Row, Col, Checkbox, Radio, DatePicker, Button, Form, Select} from 'antd';
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const RadioButton = Radio.Button;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import echarts from 'echarts';
require('echarts/theme/macarons');


export class SexChart extends React.Component {
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
    console.log("ddddd",CharData)
    if (CharData.length == 0) {
    } else {
      let myChart = echarts.init(document.getElementById('sex_chart'), 'macarons');
      myChart.setOption({
        title: {
          text: '性别比例'
        },
        series: [{
          name: '性别比例',
          type: 'pie',
          radius: '80%',
          data: [
            {
              value: CharData.man_count,
              name: "男性",
              itemStyle: {
                normal: {
                  color: '#1ABC9C'
                }
              }
            },
            {
              value: CharData.woman_count,
              name: "女性",
              itemStyle: {
                normal: {
                  color: '#E74C3C'
                }
              }
            },{
              value: CharData.other_count,
              name: "其他",
              itemStyle: {
                normal: {
                  color: '#ccc'
                }
              }
            }
          ]
        }]
      })
    }
  }

  render() {
    //生成 Charts 图表
    let styles = {
      root: {
        width: "100%",
        height: "240px",
        backgroundColor: '#f9f9f9',
        margin: "0 auto",
        marginTop: "60px"
      }
    }
    return (
      <div>
        <div className="echarts_inner">
          <div style={styles.root} id='sex_chart'></div>
        </div>
      </div>
    );
  }
}

export default SexChart
