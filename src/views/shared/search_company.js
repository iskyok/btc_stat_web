'use strict';

import React from 'react';
import {Select, Input, Spin} from 'antd';
import {API_CONFIG} from '../../config/api';
import cFetch from "../../utils/cFetch"

let timeout;
let inputValue;
const Option = Select.Option;

class SearchCompany extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      svalue: false,
      avalue: true,
      data: [],
      selectValue: '',
      fetching: true,
      url: ''
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let params = {};
    // params['per_page'] = 1000;
    let url = API_CONFIG.host + "/api/admin/core/branch_companies/all";
    let that = this;
    cFetch(url, {
      method: 'GET'
    }).then((result) => {
      that.setState({data: result.companies})
    }).catch((err) => {
      return Promise.reject(err);
    });
  }


  onSelect(value) {
    this.setState({
      selectValue: value,
      fetching: false
    });
  }


  render() {
    const selectOptions = _.map(this.state.data, function (item) {
      return (<Option key={item.id}>{item.name}</Option>)
    })
    return (
      <div>
        <Select id="category_select" size="large"
                showSearch
                allowClear
                defaultValue=" "
                onSelect={this.onSelect.bind(this)}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {selectOptions}
        </Select>
      </div>
    )
  }
}

export default SearchCompany;
