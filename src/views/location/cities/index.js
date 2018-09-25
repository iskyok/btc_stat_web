import React from 'react';
import {connect} from 'react-redux';
import CustomTable from '../../../components/CustomTable';
import {getCities,getCity2,getCity3} from '../../../reducers/actions/location/cities';
import {Input , Select} from 'antd';
import {uploadProps} from '../../../utils/helper';

import _  from 'lodash';
const Option = Select.Option;
var moment = require('moment');

export class LocationCitiesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    this.props.getCities();
  }
  onCity1Change(value){
    this.props.getCity2(value);
  }
  onCity2Change(value){
    this.props.getCity3(value);
  }
  onCity3Change(value){
    console.log(value,"已全部选择")
  }

  render() {
    const { city1Data,city2Data,city3Data } = this.props;

    return (
        <div>
          <Select
            showSearch
            style = {{width:'32%',marginLeft:"5px"}}
            onChange = {this.onCity1Change.bind(this)}
            notFoundContent = "请尝试刷新页面，获取列表失败"
          >
            {
              this.props.city1Data.map((item)=> {
                return <Option key={item.id}>{item.name}</Option>
              })
            }
          </Select>
          <Select
            showSearch
            style = {{width:'32%',marginLeft:"5px"}}
            onChange = {this.onCity2Change.bind(this)}
            notFoundContent = "请选择省级"
          >
            {
              this.props.city2Data.map((item)=> {
                return <Option key={item.id}>{item.name}</Option>
              })
            }
          </Select>
          <Select
            showSearch
            style = {{width:'32%'}}
            onChange = {this.onCity3Change.bind(this)}
            notFoundContent = "请选择市级"
          >
            {
              this.props.city3Data.map((item)=> {
                return <Option key={item.id}>{item.name}</Option>
              })
            }
          </Select>
        </div>
    );
  }
}

//redux

function mapStateToProps(state) {
  console.log(state ,"sssssssssssssssrrrrrrrrr")
  return {
    city1Data: state.location_cities.city1Data,
    city2Data: state.location_cities.city2Data,
    city3Data: state.location_cities.city3Data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCities: (params) => dispatch(getCities(params)),
    getCity2: (id) => dispatch(getCity2(id)),
    getCity3: (id) => dispatch(getCity3(id)),
    deleteCities:  (params) =>
    {
      dispatch(deleteCities(params)).then(() => {
        dispatch(getCities());
      })
    },
    change_header_tabs: (data) =>
    {
      dispatch({type: "change_header_tabs", data: data})
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationCitiesIndex);


