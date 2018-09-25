import React from 'react';
import { connect } from 'react-redux';

import CustomTable from './../../../components/CustomTable';
import { Input, Button, Popconfirm,Row, Col } from 'antd';

const InputGroup = Input.Group;
var moment = require('moment');



export class ProductsIndex extends React.Component {
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
      sortParams['sorts'] = `${sorter.columnKey} ${sortMethod}`;
    }

    const params = Object.assign({}, pageParams, filtersField, sortParams);
    this.props.fetchUsers(params);
  }

  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }

  render() {
    const { data } = this.props;
    const columns = [
      {title: "id",dataIndex: "id",render(value, record) {
        return <span>{record["id"]}</span>
      }},
      {title: "名称",dataIndex: "name",render(value, record) {
        return <span>{record['name']}</span>
      }},
      {title: "总销售额",dataIndex: "product_sum_amount",render(value, record) {
        return <span>{record['product_sum_amount']}</span>
      }},
      {title: "销量",dataIndex: "sale_count",render(value, record) {
        return <span>{record['sale_count']}</span>
      }},
      {title: "所属企业",dataIndex: "shop_user_name",render(value, record) {
        return <span>{record['shop_user_name']}</span>
      }},
      {title: "上架时间",dataIndex: "created_at",render(value, record) {
        return <span>{record['created_at']}</span>
      }}
    ];

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const pagination = {
      showSizeChanger: true,
      current: data.meta.current_page,
      total: data.meta.total_count,
      pageSize: data.meta.per_page,
      pageSizeOptions: ['1', '10', '20', '40']
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
          dataSource={data.products}
          pagination={pagination}
          rowKey={(record) => record.id}
          onChange={this.handleTableChange}
          bordered
        />
      </div>
    );
  }
}

export default ProductsIndex;
