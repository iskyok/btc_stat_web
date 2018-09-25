import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Card, Row, Col, Checkbox, Radio, DatePicker, Button, Form, Select} from 'antd';
import {push} from 'react-router-redux'
import Search from './search';
import {getMindIndex} from '../../reducers/actions/mind';
import CustomTable from '../../components/CustomTable';
import _ from "lodash";

class MindIndex extends Component {
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
      this.props.getMindIndex(params);
    }else{
      this.props.getMindIndex();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.location.query, this.props.location.query)) {
      this.props.getMindIndex(nextProps.location.query)
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
    let {data} = this.props;

    const columns = [
      {title: "ID",dataIndex: "id",key: "id"},

      {title: "注册时间",dataIndex: "created_at",key: "created_at",sorter: true},

      {title: "昵称",dataIndex: "nickname",key: "nickname",render(value, record) {
        return <span>{record["nickname"]}</span>
      }},
      {title: "账号",dataIndex: "phone",render(value, record) {
        return <span>{record["phone"]}</span>
      }},
      {title: "等级",dataIndex: "level_name",key: "level_name",render(value, record) {
        return <span>{record["level_name"]}</span>
      }},
      {title: "厂家数",dataIndex: "shop_counts",key: "shop_counts",render(value, record) {
        return <span>{record['shop_counts']}</span>
      }},
      {title: "下级人数",dataIndex: "dealer1_count",key: "dealer1_count",render(value, record) {
        return <span>{record['dealer1_count']}</span>
      }},
      {title: "下下级人数",dataIndex: "dealer2_count",key: "dealer2_count",render(value, record) {
        return <span>{record['dealer2_count']}</span>
      }},
      {title: "所属渠道",dataIndex: "team_name",key: "team_name",render(value, record) {
        return <span>{record['team_name']}</span>
      }},
      {title: "邀请码",dataIndex: "invitation",key: "invitation",render(value, record) {
        return <span>{record['invitation']}</span>
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
          dataSource={data.users}
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
    data: state.mind.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMindIndex: (params) => dispatch(getMindIndex(params)),
    pushQuery: (params)=>{
      dispatch(push(params))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MindIndex);
