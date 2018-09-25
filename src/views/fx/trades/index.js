import React from 'react';
import {connect} from 'react-redux';
import CustomTable from '../../../components/CustomTable';
import {getTrades,deleteTrades} from '../../../reducers/actions/fx/trades';
import {Input, Button, Popconfirm, Row, Col} from 'antd';
import TradeNew from './new.js';
import Search from './search.js';
import {uploadProps} from '../../../utils/helper';


// 退款事件

const InputGroup = Input.Group;
var moment = require('moment');

export class FxTradesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = {
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    this.props.getTrades();
  }

  handleTableChange(pagination, filters = {}, sorter = {}) {
    const pageParams = {page: pagination.current, per_page: pagination.pageSize};
    const filtersField = {};
    const sortParams = {};
    if (Object.keys(sorter).length !== 0) {
      const sortMethod = sorter.order === "descend" ? "desc" : "asc";
      sortParams['sorts'] = `${sorter.columnKey} ${sortMethod}`;
    }
    let queryParams = this.props.query;
    const params = Object.assign({}, queryParams, pageParams, filtersField, sortParams);
   console.log("xxxxd",params)
    this.props.getLevels(params);
  }

  onSelectChange(selectedRowKeys) {
    this.setState({selectedRowKeys});
  }

  //编辑
  editForm(item) {
    this.refs.editForm.showModal(item)
  }

  //新建
  newForm(item) {
    this.refs.newForm.showModal(item)
  }
  //查看
  lookForm(item) {
    this.refs.lookForm.showModal(item)
  }
  unSelectCheck() {
  if (this.state.selectedRowKeys.length < 1) {
      message.error('请选择数据项');
       return true
     }
  }

  //删除
  delete() {
    if (this.unSelectCheck()) {
      return
    }
    console.log("上架ids" + this.state.selectedRowKeys)
    this.props.deleteLevels({id: this.state.selectedRowKeys})

  }

  render() {
    const {data} = this.props;
    const columns = [
      {title: "ID", dataIndex: "id", key: "id" ,sorter: (a, b) => a.id - b.id,render(value, record) {
        return <span>{record['id']}</span>
      }},

       {title: "订单号", dataIndex: "number", key: "number" ,render(value, record) {
         return <span>{record['number']}</span>
       }},

       {title: "名称", dataIndex: "name", key: "name",render(value, record) {
         return <span>{record['name']}</span>
       }},


       {title: "订单总金额", dataIndex: "total_amount", key: "total_amount",sorter: true,render(value, record) {
         return <span>{record['total_amount']}</span>
       }},

       {title: "分成金额", dataIndex: "amount", key: "amount",sorter: true,render(value, record) {
         return <span>{record['amount']}</span>
       }},

       {title: "购买者", dataIndex: "user.name", key: "user.name",render(value, record) {
         return <span>{record['user']['nickname'] }</span>
       }},

       {title: "状态", dataIndex: "state", key: "state",render(value, record) {
         return <span>{record['state']}</span>
       }},

       {title: "创建时间", dataIndex: "7", key: "7",sorter: true,render(value, record) {
         return <span>{record['created_at']}</span>
       }},

      {
        title: '操作', key: 'operation', render: (item) => (
          <div className="actions">
            <a type="primary" onClick={this.editForm.bind(this, item)}>编辑</a>
            <Popconfirm title="确定删除？" placement="right"
                        onConfirm={this.props.deleteTrades.bind(this, {id: item.id})}>
              <a style={{marginTop: "2px"}}>删除</a>
            </Popconfirm>
          </div>
        )
      }
  ];

    const pagination = {
      showSizeChanger: true,
      total: data.meta.total_count,
      pageSize: data.meta.per_page,
      pageSizeOptions: ['1', '10', '20', '40']
    };
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
          <Search ref="search" indexPage={this}></Search>
          <Row>
            <Col span={10}>
              <div style={{marginBottom: 16}} className="actions-control">
                <Button onClick={this.newForm.bind(this, {})}>新建</Button>
                <Popconfirm title="确定删除？" placement="right" onConfirm={this.delete.bind(this)}>
                  <Button type="primary">删除</Button>
                </Popconfirm>
              </div>
            </Col>
          </Row>
          <CustomTable
              columns={columns}
              dataSource={data.trades}
              pagination={pagination}
              rowKey={(record) => record.id}
              onChange={this.handleTableChange}
              rowSelection={rowSelection}
              bordered
          />
          <TradeNew ref="newForm" title="新建" formType="newForm"></TradeNew>
          <TradeNew ref="editForm" title="编辑" formType="editForm"></TradeNew>
          <TradeNew ref="lookForm" title="查看" formType="lookForm"></TradeNew>
        </div>
    );
  }
}

//redux

function mapStateToProps(state) {
  return {data: state.fx_trades.data};
}

function mapDispatchToProps(dispatch) {
  return {
    getTrades: (params) => dispatch(getTrades(params)),
    deleteTrades:  (params) =>
    {
      dispatch(deleteTrades(params))
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
)(FxTradesIndex);


