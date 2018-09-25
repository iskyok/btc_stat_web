import React from 'react';
import {connect} from 'react-redux';
import CustomTable from './../../../components/CustomTable';
import {Input,Pagination, Button, Popconfirm, Row, Col} from 'antd';
const InputGroup = Input.Group;
var moment = require('moment');
import {renderPercentTxt} from '../../../utils/helper';
import {Link} from 'react-router';

export class ExchangeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = {
      selectedRowKeys: []
    };
  }

  componentDidMount() {
  }

  handleTableChange(pagination, filters = {}, sorter = {}) {
    console.log("llllllll---",pagination)
    const pageParams = {page: pagination.current, per_page: pagination.pageSize};
    const filtersField = {};
    const sortParams = {};
    if (Object.keys(sorter).length !== 0) {
      const sortMethod = sorter.order === "descend" ? "desc" : "asc";
      sortParams['order'] = `${sorter.columnKey} ${sortMethod}`;
    }

    let old_params = this.props.location.query;
    console.log("ddddddddddd", old_params, this.props)
    const params = Object.assign({}, old_params, pageParams, filtersField, sortParams);
    let id = this.props.params.id;
    this.props.getCoinMarkets(id,params);
    // this.props.pushQuery({
    //   pathname: this.props.location.pathname,
    //   query: params
    // });
  }

  onSelectChange(selectedRowKeys) {
    this.setState({selectedRowKeys});
  }

  render() {
    const {data} = this.props;
    const columns = [
      {
        title: "#",width: 50,dataIndex: "index", render(value, record) {
        return <span>{(data.meta.current_page - 1) * data.meta.per_page + data.market_coins.indexOf(record) + 1}</span>
      }
      },
      {
        title: "交易对",width: 100, dataIndex: "exchange_way", sorter: true, render(value, record) {
        return <span>{record['exchange_way']}</span>
      }
      },
      {
        title: "价格",width: 100, dataIndex: "price", sorter: true, render(value, record) {
        return <span>{record['price']}</span>
      }
      },
      {
        title: "成交量",width: 100, dataIndex: "exchange_count", sorter: true, render(value, record) {
        return <span>{record['exchange_count']}</span>
      }
      },
      {
        title: "成交额",width: 100, dataIndex: "exchange_amount", sorter: true, render(value, record) {
        return <span>{record['exchange_amount']}</span>

      }
      },
      {
        title: "占比 ",width: 100, dataIndex: "curr_up_per", sorter: true, sorter: true, render(value, record) {
        return <span>{record['exchange_amount']}</span>

      }
      },
      {
        title: "更新时间",width: 100, dataIndex: "updated_at", sorter: true, render(value, record) {
        return <span>{moment(record['updated_at']).fromNow()}</span>
      }
      }
    ];

    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const pagination = {
      showSizeChanger: true,
      current: data.meta.current_page,
      total: data.meta.total_count,
      pageSize: data.meta.per_page,
      showTotal: function (total, range) {
        return `共计： ${total}条数据`
      },
      pageSizeOptions: ['1', '15', '20', '40','100']
    };
    const hasSelected = selectedRowKeys.length > 0;
    // CustomTable ant.design组件table ，添加滚动条scroll :{{x:1300}} 属性，
    // 因为列表项数据过多，数据单行加载不全，宽度1300 待修改
    // 另外缺点是后面的操作按钮，挤到列表的最后，不好操作
    // 考虑的方案是将操作放到列表头，方便操作
    let topPagination={
      showSizeChanger: true,
      current: data.meta.current_page,
      total: data.meta.total_count,
      pageSize: data.meta.per_page,
      pageSizeOptions: ['1', '15', '20', '40','100']
    };
    return (
      <div>
        <div className="table-header2" >
          <Pagination className="top-pagination" {...topPagination} onChange={(page)=>{this.handleTableChange({current: page,pageSize: topPagination.pageSize})}} onShowSizeChange={(page,pageSize)=>{this.handleTableChange({current: page,pageSize: pageSize})}}/>
        </div>
        <CustomTable
          columns={columns}
          dataSource={data.market_coins}
          pagination={pagination}
          rowKey={(record) => record.id}
          onChange={this.handleTableChange}
          bordered
        />
      </div>
    );
  }
}

export default ExchangeIndex;
