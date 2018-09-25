import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import CustomTable from '../../../components/CustomTable';
import { getSubCompanies } from '../../../reducers/actions/stat/sub_companies';
import {Input, Button, Menu, message, Popconfirm, Popover} from 'antd';
import Search from './search';
import {push} from 'react-router-redux';
import _ from "lodash";

export class StatSubCompaniesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.state = {
    };
  }

  componentDidMount() {
    let params = this.props.location.query;
    this.props.getSubCompanies(params);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.location.query, this.props.location.query)) {
      let params=nextProps.location.query || {};
      this.props.getSubCompanies(params)
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


  onSelectChange(selectedRowKeys) {
    this.setState({selectedRowKeys});
  }


  render() {
    const {data ,loading} = this.props;
    let query = this.props.location.query;


    const columns = [
      {
        title: "ID", dataIndex: "id", key: "id", render(value, record) {
        return <span>{record['id']}</span>
      }
      },
      {
        title: "子公司名称", dataIndex: "name", key: "name", render(value, record) {
        return <span >{record['name']}</span>
      }
      },
      {
        title: "消费金额", dataIndex: "xf_price", key: "xf_price", render(value, record) {
        return <span>{record['xf_price']}</span>
      }
      },
      {
        title: "公司获利", dataIndex: "hl_price", key: "hl_price", render(value, record) {
        return <span>{record['hl_price']}</span>
      }
      },
      // {
      //   title: '操作', key: 'operation', render: (item) => (
      //   <div className="actions">
      //     <Popconfirm title="解除封停？" placement="right" onConfirm={()=>{}}>
      //       <a>解除</a>
      //     </Popconfirm>
      //   </div>
      // )
      // },
    ];

    const pagination = {
      showSizeChanger: true,
      current:parseInt(query.page)||1,
      total: data.meta.total_count,
      pageSize: data.meta.per_page,
      pageSizeOptions: ['1', '10', '20', '40']
    };
    return (
      <div>
        <Search {...this.props}/>
        <CustomTable
          columns={columns}
          dataSource={data.companies}
          pagination={pagination}
          loading = {loading}
          rowKey={(record) => record.id}
          onChange={this.handleTableChange}
          bordered
        />
      </div>
    );
  }
}

//redux
function mapStateToProps(state) {
  let { data , loading } = state.stat_sub_companies ;
  return {
    data , loading
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getSubCompanies: (params) => dispatch(getSubCompanies(params)),
    pushQuery: (params)=> {
      dispatch(push(params))
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatSubCompaniesIndex);
