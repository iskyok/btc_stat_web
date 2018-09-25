import React from 'react';
import {connect} from 'react-redux';

import CustomTable from './../../../components/CustomTable';
import {getTeamList, removeMember} from '../../../reducers/actions/company/teams';
import {Input, Button, Popconfirm, Row, Col, message, Popover} from 'antd';
import {Link} from 'react-router';
import {push} from 'react-router-redux'

const InputGroup = Input.Group;
var moment = require('moment');
import Search from './search';
import NewMember from './new_member';


export class CompanyTeamList extends React.Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = {
      selectedRowKeys: [],
      itemId: ""
    };
  }

  componentDidMount() {
    let params = this.props.location.query;
    this.props.getTeamList(params);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.location.query, this.props.location.query)) {
      this.props.getTeamList(nextProps.location.query)
    }
  }

  //编辑
  editForm(item) {
    this.setState({editFormVisible: true, itemId: item.id})
  }

  //新建
  newForm() {
    this.setState({newFormVisible: true})
  }

  hideNewMember() {
    this.setState({newFormVisible: false, editFormVisible: false})
  }

  handleTableChange(pagination, filters = {}, sorter = {}) {
    const pageParams = {page: pagination.current, per_page: pagination.pageSize};
    const filtersField = {};
    const sortParams = {};
    if (Object.keys(sorter).length !== 0) {
      const sortMethod = sorter.order === "descend" ? "desc" : "asc";
      sortParams['sorts'] = `${sorter.columnKey} ${sortMethod}`;
    }

    let params = Object.assign({}, pageParams, filtersField, sortParams);
    console.log('查询参数【】【】[][][][][', params)
// 查询 参数
    this.props.pushQuery({
      pathname: this.props.location.pathname,
      query: params
    })
  }

  onSelectChange(selectedRowKeys) {
    this.setState({selectedRowKeys});
  }

  render() {
    const data = this.props.data;
    let query = this.props.location.query;
    let itemId = query.id;
    const columns = [
      {title: "ID", dataIndex: "id", key: "id"},
      {
        title: "名称", dataIndex: "name", key: "name", render(value, record) {
        return <span>{record['account'] && record['account']['nickname']}</span>
      }
      },
      {
        title: "手机号", dataIndex: "phone", key: "phone", render(value, record) {
        return <span>{record['account'] && record['account']['phone']}</span>
      }
      },
      {
        title: "所属公司", dataIndex: "company_name", key: "company_name", render(value, record) {
        return <span>{record['company_name']}</span>
      }
      },
      {
        title: '操作', key: 'operation', render: (item) => (
        <div className="opts">
          <Popconfirm title="是否移除？" placement="right"
                      onConfirm={this.props.deleteItem.bind(this, itemId, {user_id: item.id})}>
            <a style={{marginTop: "2px"}}>移除</a>
          </Popconfirm>

        </div>
      )
      }
    ];

    const pagination = {
      showSizeChanger: true,

      total: data.meta.total_count,

      current: parseInt(query.page) || 1,

      pageSize: data.meta.per_page,
      pageSizeOptions: ['1', '10', '20', '40']
    };
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div>
        {/*<Search {...this.props}></Search>*/}
        <div className="ant-advanced-search-form">
          公司名称： <span>{data.company_name}</span>
        </div>
        <Row>
          <Col span={10}>
            <div style={{marginBottom: 16}} className="actions-control">
              <Button type="primary" onClick={this.newForm.bind(this)}>添加成员</Button>
            </div>
          </Col>
        </Row>
        <CustomTable
          columns={columns}
          dataSource={data.users}
          pagination={pagination}
          rowKey={(record) => record.id}
          onChange={this.handleTableChange}
          rowSelection={rowSelection}
          bordered
        />
        {this.state.newFormVisible ?
          <NewMember   {...this.props} ref="newForm" title="添加成员" formType="newForm" onSubmit={() => {
            this.hideNewMember()
          }} onCancel={() => {
            this.hideNewMember()
          }}></NewMember> : null}
        {this.state.editFormVisible ?
          <NewMember {...this.props} ref="editForm" title="编辑" itemId={this.state.itemId} formType="editForm"
                     onSubmit={() => {
                       this.hideNewMember()
                     }} onCancel={() => {
            this.hideNewMember()
          }}></NewMember> : null}
      </div>
    );
  }
}

//redux
function mapStateToProps(state) {
  return {data: state.company_teams.listData};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getTeamList: (params) => dispatch(getTeamList(params)),
    deleteItem: (id, params) => {
      dispatch(removeMember(id, params)).then(() => {
        dispatch(getTeamList(ownProps.location.query));
      });
    },
    pushQuery: (params) => {
      dispatch(push(params))
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyTeamList);
