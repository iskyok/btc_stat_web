import React from 'react';
import {connect} from 'react-redux';

import CustomTable from './../../../components/CustomTable';
import {getTeams, createTeam, updateTeam} from '../../../reducers/actions/company/teams';
import {Input, Button, Popconfirm, Row, Col, message, Popover} from 'antd';
import {Link} from 'react-router';
import {push} from 'react-router-redux'

const InputGroup = Input.Group;
var moment = require('moment');
import Search from './search';
import TeamNew from './new';


export class CompanyTeamIndex extends React.Component {
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
    if (!!this.props.location.query.page) {
      let params = undefined;
      params = this.props.location.query
      this.props.getTeams(params);
    } else {
      this.props.getTeams();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.location.query, this.props.location.query)) {
      this.props.getTeams(nextProps.location.query)
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

  hideTeamNew() {
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
    const columns = [
      {title: "ID", dataIndex: "id", key: "id"},
      {
        title: "公司名称", dataIndex: "name", key: "name", render(value, record) {
        return <span>{record['name']}</span>
      }
      },
      {
        title: "是否发布", dataIndex: "published", key: "published", render(value, record) {
        return value ? <span style={{"color": "#30CD71"}}>是</span> : "否"
      }
      },
      {
        title: "所属公司", dataIndex: "company_name", key: "company_name", render(value, record) {
        return <span>{record['company_name']}</span>
      }
      },
      {
        title: "总用户数", dataIndex: "user_count", key: "user_count", render(value, record) {
        return <span>{record['user_count']}</span>
      }
      },
      {
        title: "邀请码", dataIndex: "invitation", key: "invitation", render(value, record) {
        return <span>{record['invitation']}</span>
      }
      },
      {
        title: "邀请二维码", dataIndex: "qrcode_url", key: "qrcode_url", render(value, record) {
        return <Popover content={<img src={record['qrcode_url']} className="img200"/>}
                        title={record['name']}
                        trigger="hover">
          <span className="look_qrcode">查看二维码</span>
        </Popover>
      }
      },
      {
        title: '操作', key: 'operation', render: (item) => (
        <div className="opts">
          <a type="primary" onClick={this.editForm.bind(this, item)}>编辑</a>
          <Link to="/manage/company/teams/list" query={{"id": item.id}}>查看成员</Link>
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
        <Search {...this.props}></Search>
        <CustomTable
          columns={columns}
          dataSource={data.teams}
          pagination={pagination}
          rowKey={(record) => record.id}
          onChange={this.handleTableChange}
          rowSelection={rowSelection}
          bordered
        />
        {this.state.newFormVisible ? <TeamNew   {...this.props}  ref="newForm" title="新建" formType="newForm" onSubmit={() => {
          this.hideTeamNew()
        }} onCancel={() => {
          this.hideTeamNew()
        }}></TeamNew> : null}
        {this.state.editFormVisible ?
          <TeamNew {...this.props} ref="editForm" title="编辑" itemId={this.state.itemId} formType="editForm" onSubmit={() => {
            this.hideTeamNew()
          }} onCancel={() => {
            this.hideTeamNew()
          }}></TeamNew> : null}
      </div>
    );
  }
}

//redux
function mapStateToProps(state) {
  return {data: state.company_teams.data};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getTeams: (params) => dispatch(getTeams(params)),
    // deleteBusiness: (params) => {
    // 	dispatch(deleteBusiness(params)).then(()=> {
    // 		dispatch(getCompanies());
    // 	});
    // },
    pushQuery: (params) => {
      dispatch(push(params))
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyTeamIndex);
