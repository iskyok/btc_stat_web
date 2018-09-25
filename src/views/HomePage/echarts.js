import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {getEcharts} from '../../reducers/actions/echarts';
import {Card} from 'antd';
import echarts from 'echarts';


export class EchartsShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getEcharts();

  }

  initCharts(CharData) {
    if (CharData.length == 0) {
    } else {
      if (document.getElementById('echart') == null) {
        return
      }
      let myChart = echarts.init(document.getElementById('echart'));
      myChart.setOption({
        title: {
          text: '信息统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
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
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }

        ],
        series: CharData
      })
    }
  }


  render() {
    const {data} = this.props;
    //生成 Charts 图表
    this.initCharts(data || []);
    let styles = {
      root: {
        width: "75%",
        minWidth: "600px",
        height: "240px",
        backgroundColor: '#f9f9f9',
        margin: "0 auto"
      }
    }
    return (
      <div className="echarts_inner">
        <div style={styles.root} id='echart'></div>
      </div>
    );
  }
}

//redux
function mapStateToProps(state) {
  // console.log("ggggggg",state.echarts.data)
  return {data: state.echarts.data};
}

function mapDispatchToProps(dispatch) {
  return {
    getEcharts: (params) => dispatch(getEcharts(params)),
    // deleteUser: (params) => {
    //   dispatch(deleteUser(params)).then(()=> {
    //     dispatch(getEcharts());
    //   });
    // },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EchartsShow);
