import React from 'react';
import { connect } from 'react-redux';

import CustomTable from './../../../components/CustomTable';
import { Input, Button, Popconfirm,Row, Col } from 'antd';

const InputGroup = Input.Group;
var moment = require('moment');



export class CompaniesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = {
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    // this.props.getReads();
  }

  handleTableChange(pagination, filters = {}, sorter = {}) {
    const pageParams = { page: pagination.current, per_page: pagination.pageSize };
    const filtersField = {};
    const sortParams = {};
    if (Object.keys(sorter).length !== 0) {
      const sortMethod = sorter.order === "descend" ? "desc" : "asc";
      sortParams['order'] = `${sorter.columnKey} ${sortMethod}`;
    }

    let query=this.props.location.query||{};
    const params = Object.assign({}, query,pageParams, filtersField, sortParams);
    // this.props.getStatCompanies(params);
    // this.props.pushQuery(params)
    this.props.pushQuery({
      pathname: this.props.location.pathname,
      query: params
    })
  }

  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }

  render() {
    const { data } = this.props;
    const columns = [
      {title: "分公司",dataIndex: "name",render(value, record) {
        return <span>{record["name"]}</span>
      }},
      {title: "订单数量",dataIndex: "shop_trades_count",  sorter: true, render(value, record) {
        return <span>{record['shop_trades_count']}</span>
      }},
      {title: "销售额",dataIndex: "shop_trades_amount", sorter: true, render(value, record) {
        return <span>{record['shop_trades_amount']}</span>
      }},
      {title: "商品数量",dataIndex: "products_count", sorter: true, render(value, record) {
        return <span>{record['products_count']}</span>
      }},
      {title: "人数",dataIndex: "users_count", sorter: true, render(value, record) {
        return <span>{record['users_count']}</span>
      }},
      {title: "管家数",dataIndex: "mind_users_count", sorter: true, render(value, record) {
        return <span>{record['mind_users_count']}</span>
      }},
      {title: "厂家数量",dataIndex: "mind_shops_count", sorter: true, render(value, record) {
        return <span>{record['mind_shops_count']}</span>
      }}
    ];

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    // CustomTable ant.design组件table ，添加滚动条scroll :{{x:1300}} 属性，
    // 因为列表项数据过多，数据单行加载不全，宽度1300 待修改
    // 另外缺点是后面的操作按钮，挤到列表的最后，不好操作
    // 考虑的方案是将操作放到列表头，方便操作
    return (
      <div>
        <CustomTable
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey={(record) => record.id}
          onChange={this.handleTableChange}
          bordered
        />
      </div>
    );
  }
}

export default CompaniesIndex;
