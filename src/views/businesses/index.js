import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Card, Row, Col, Checkbox, Radio, DatePicker, Button, Form, Select} from 'antd';
import {push} from 'react-router-redux'
import Search from './search';
import {getBusinessIndex} from '../../reducers/actions/businesses';
import CustomTable from '../../components/CustomTable';
import _ from "lodash";

class BusinessIndex extends Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
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
      this.props.getBusinessIndex(params);
    }else{
      this.props.getBusinessIndex();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.location.query, this.props.location.query)) {
      this.props.getBusinessIndex(nextProps.location.query)
    }
  }


  handleTableChange(pagination, filters = {}, sorter = {}) {
    const pageParams = {page: pagination.current, per_page: pagination.pageSize};
    const filtersField = {};
    const sortParams = {};
    if (Object.keys(sorter).length !== 0) {
      const sortMethod = sorter.order === "descend" ? "desc" : "asc";
      sortParams['sorts'] = `${sorter.columnKey} ${sortMethod}`;
    }
    let query = this.props.location.query;
    const params = Object.assign({},query, pageParams, filtersField, sortParams);
    this.props.pushQuery({
      pathname: this.props.location.pathname,
      query: params
    })
  }
  render() {
    let {data ,loading} = this.props;

    const columns = [
      {title: "ID",dataIndex: "id",key: "id"},

      {title: "创建时间",dataIndex: "created_at",key: "created_at",sorter: true},

      {title: "厂家名称",dataIndex: "name",key: "name",render(value, record) {
        return <span>{record["name"]}</span>
      }},
      {title: "管家昵称",dataIndex: "nick_name",key: "nick_name",render(value, record) {
        return <span>{record["mind_user"]["name"]}</span>
      }},
      {title: "品牌数量",dataIndex: "brands_count",key: "brands_count",render(value, record) {
        return <span>{record["brands_count"]}</span>
      }},
      {title: "产品数量",dataIndex: "products_count",key: "products_count",render(value, record) {
        return <span>{record['products_count']}</span>
      }},
      {title: "订单数",dataIndex: "trades_count",key: "trades_count",render(value, record) {
        return <span>{record['trades_count']}</span>
      }},
      {title: "销售额",dataIndex: "trades_amount",key: "trades_amount",render(value, record) {
        return <span>{record['trades_amount']}</span>
      }}
    ];

    const pagination = {
      showSizeChanger: true,
      total: data.meta.total_count,
      pageSize: data.meta.per_page,
      pageSizeOptions: ['1','10','20','40']
    };
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
          <div className="ant-advanced-search-form">
            <Search {...this.props}/>
          </div>

        <CustomTable
          columns={columns}
          dataSource={data.mind_shops}
          loading={loading}
          pagination={pagination}
          rowKey={(record) => record.id}
          onChange={this.handleTableChange}
          rowSelection={rowSelection}
          bordered
        />
      </div>
    );
  }
}


//redux
function mapStateToProps(state) {
  return {
    data: state.businesses.data,
    loading: state.businesses.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBusinessIndex: (params) => dispatch(getBusinessIndex(params)),
    pushQuery: (params)=>{
      dispatch(push(params))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessIndex);
