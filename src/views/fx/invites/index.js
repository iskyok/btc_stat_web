import React from 'react';
import {connect} from 'react-redux';
import CustomTable from '../../../components/CustomTable';
import {getInvites} from '../../../reducers/actions/fx/invites';
import {Input, Button, Popconfirm, Row, Col} from 'antd';
import InviteNew from './new.js';
import Search from './search.js';
import {uploadProps} from '../../../utils/helper';

const InputGroup = Input.Group;
var moment = require('moment');

export class FxInvitesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = {
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    this.props.getInvites();
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
    this.props.fetchInvites(params);
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

  //删除
  deleteInvites() {

  }

  render() {
    const {data} = this.props;
    const columns = [
      {title: "ID", dataIndex: "id", key: "id" ,sorter: true,render(value, record) {
        return <span>{record['id']}</span>
      }},

       {title: "被邀请者", dataIndex: "user.name", key: "user.name",render(value, record) {
         return <span>{record['user']['name']}</span>
       }},

       {title: "升级等级", dataIndex: "user_level", key: "user_level" ,sorter: true,render(value, record) {
         return <span>{record['user_level']}</span>
       }},

       {title: "邀请人", dataIndex: "used_byer.name", key: "used_byer.name",render(value, record) {
         return <span>{record['used_byer']['name']}</span>
       }},

       {title: "邀请人等级", dataIndex: "used_byer_level", key: "used_byer_level" ,sorter: true,render(value, record) {
         return <span>{record['used_byer_level']}</span>
       }},

       {title: "邀请时间", dataIndex: "created_at", key: "created_at" ,sorter: true,render(value, record) {
         return <span>{record['created_at']}</span>
       }},

      {
        title: '操作', key: 'operation', render: (item) => (
          <div className="actions">
            <a type="primary" onClick={this.editForm.bind(this, item)}>编辑</a>
            <Popconfirm title="确定删除？" placement="right"
                        onConfirm={this.props.deleteInvites.bind(this, {id: item.id})}>
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
          <Search></Search>
          <Row>
            <Col span={10}>
              <div style={{marginBottom: 16}} className="actions-control">
                <Button onClick={this.newForm.bind(this, {})}>新建</Button>
                <Popconfirm title="确定删除？" placement="right" onConfirm={this.props.deleteInvites.bind(this)}>
                  <Button type="primary">删除</Button>
                </Popconfirm>
              </div>
            </Col>
          </Row>
          <CustomTable
              columns={columns}
              dataSource={data.invites}
              pagination={pagination}
              rowKey={(record) => record.id}
              onChange={this.handleTableChange}
              rowSelection={rowSelection}
              bordered
          />
          <InviteNew ref="newForm" title="新建" formType="newForm"></InviteNew>
          <InviteNew ref="editForm" title="编辑" formType="editForm"></InviteNew>
        </div>
    );
  }
}

//redux

function mapStateToProps(state) {
  return {data: state.fx_invites.data};
}

function mapDispatchToProps(dispatch) {
  return {
    getInvites: (params) => dispatch(getInvites(params)),
    deleteInvites:  (params) =>
    {
      dispatch(deleteInvites(params)).then(() => {
        dispatch(getInvites());
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
)(FxInvitesIndex);


