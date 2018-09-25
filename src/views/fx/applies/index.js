import React from 'react';
import {connect} from 'react-redux';
import CustomTable from '../../../components/CustomTable';
import {getApplies} from '../../../reducers/actions/fx/applies';
import {Input, Button, Popconfirm, Row, Col} from 'antd';
import ApplyNew from './new.js';
import Search from './search.js';
import {uploadProps} from '../../../utils/helper';

const InputGroup = Input.Group;
var moment = require('moment');

export class FxAppliesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = {
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    this.props.getApplies();
  }

  handleTableChange(pagination, filters = {}, sorter = {}) {
    const pageParams = {page: pagination.current, per_page: pagination.pageSize};
    const filtersField = {};
    const sortParams = {};
    if (Object.keys(sorter).length !== 0) {
      const sortMethod = sorter.order === "descend" ? "desc" : "asc";
      sortParams['sorts'] = `${sorter.columnKey} ${sortMethod}`;
    }

    const params = Object.assign({}, pageParams, filtersField, sortParams);
    this.props.fetchApplies(params);
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


  render() {
    const {data} = this.props;
    const columns = [
      {title: "ID", dataIndex: "id", key: "id",sorter: (a, b) => a.id - b.id,render(value, record) {
        return <span>{record['id']}</span>
      }},

       {title: "名称", dataIndex: "name", key: "name",render(value, record) {
         return <span>{record['name']}</span>
       }},

       {title: "手机", dataIndex: "account.account", key: "account.account",render(value, record) {
         return <span>{record['account']['account']}</span>
       }},

       {title: "等级", dataIndex: "level.name", key: "level.name",render(value, record) {
         return <span>{record['level']['name']}</span>
       }},

       {title: "所属上级分销商", dataIndex: "prev_dealer", key: "prev_dealer",render(value, record) {
         return <span>{record['prev_dealer']}</span>
       }},

      {title: "个人消费", dataIndex: "cost_amount", key: "cost_amount",render(value, record) {
        return <span>{record['cost_amount']}</span>
      }},


      {title: "状态", dataIndex: "state_name", key: "state_name",render(value, record) {
         return <span>{record['state_name']}</span>
       }},

       {title: "创建时间", dataIndex: "created_at", key: "created_at",render(value, record) {
         return <span>{record['created_at']}</span>
       }},

      {
        title: '操作', key: 'operation', render: (item) => (
          <div className="actions">
            <Button type="primary" onClick={this.editForm.bind(this, item)}>编辑</Button>
            <Popconfirm title="确定删除？" placement="right"
                        onConfirm={this.props.deleteApplies.bind(this, {id: item.id})}>
              <Button style={{marginTop: "2px"}}>删除</Button>
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
          {/*<Search ref="search" indexPage={this}></Search>*/}
          <Row>
            <Col span={10}>
              <div style={{marginBottom: 16}} className="actions-control">
                <Button onClick={this.newForm.bind(this, {})}>新建</Button>
                <Popconfirm title="确定删除？" placement="right" onConfirm={this.props.deleteApplies.bind(this)}>
                  <Button type="primary">删除</Button>
                </Popconfirm>
              </div>
            </Col>
          </Row>
          <CustomTable
              columns={columns}
              dataSource={data.apply_users}
              pagination={pagination}
              rowKey={(record) => record.id}
              onChange={this.handleTableChange}
              rowSelection={rowSelection}
              bordered
          />
          <ApplyNew ref="newForm" title="新建" formType="newForm"></ApplyNew>
          <ApplyNew ref="editForm" title="编辑" formType="editForm"></ApplyNew>
        </div>
    );
  }
}

//redux

function mapStateToProps(state) {
  return {data: state.fx_applies.data};
}

function mapDispatchToProps(dispatch) {
  return {
    getApplies: (params) => dispatch(getApplies(params)),
    deleteApplies:  (params) =>
    {
      dispatch(deleteApplies(params)).then(() => {
        dispatch(getApplies());
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
)(FxAppliesIndex);


