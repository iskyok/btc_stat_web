import React from 'react';
import {connect} from 'react-redux';
import CustomTable from '../../../components/CustomTable';
import {getChildren} from '../../../reducers/actions/fx/users';
import {Input, Button, Popconfirm, Row, Col} from 'antd';
import Search from './search.js';
import {uploadProps} from '../../../utils/helper';
import {push} from 'react-router-redux';

const InputGroup = Input.Group;
var moment = require('moment');


export class FxUsersChildrenIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = {
      childrenId : 0,
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    this.props.getChildren(Object.assign({},{id: this.props.params.id},this.props.location.query));
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.location.query, this.props.location.query)) {
      this.props.getChildren(Object.assign({},{id: this.props.params.id},nextProps.location.query))
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
    const params = Object.assign({}, query, pageParams, filtersField, sortParams);
    console.log("kkk-----",params)
    this.props.pushQuery({
      pathname: this.props.location.pathname,
      query: params
    })
  }

  onSelectChange(selectedRowKeys) {
    this.setState({selectedRowKeys});
  }

  //编辑
  editForm(item) {
    this.refs.editForm.showModal(item)
  }


  //删除
  deleteUsers(that, id) {
    // this.props.deleteUsers(that,id)
  }

  render() {
    const {data,loading} = this.props;
    let query = this.props.location.query;
    console.log("eee",data,this.props.location.state)
    // console.log(data ,this.props.location.state.data, '++++++++-----------rrrrrrdatra ')
    // console.log(data.users[this.state.childrenId].dealer,this.state.childrenId,"52------------+++++++++++++rrrr")
    const columns = [
      {title: "ID", dataIndex: "id", key: "id" ,sorter: true},

      {title: "用户ID", dataIndex: "dealer.id", key: "dealer.id",render(value, record) {
        return <span>{record['dealer']['id']}</span>
      }},

      {title: "名称", dataIndex: "dealer.name", key: "dealer.name",render(value, record) {
        return <span>{record['dealer']['nickname']}</span>
      }},

      {title: "手机", dataIndex: "dealer.child_phone", key: "dealer.child_phone",render(value, record) {
        return <span>{record['dealer']['phone']}</span>
      }},

      {title: "等级", dataIndex: "dealer.level_name", key: "dealer.level_name",render(value, record) {
        return <span>{record['dealer']['level_name']}</span>
      }},

      // {title: "升级状态", dataIndex: "dealer.upgrade_state_html", key: "dealer.upgrade_state_html",render(value, record) {
      //   return <span>{record['dealer']['upgrade_state_html']}</span>
      // }},

      {title: "总收入", dataIndex: "dealer.total_amount", key: "dealer.total_amount",render(value, record) {
        return <span>{record['dealer']['total_amount']}</span>
      }},

      // {title: "账户余额", dataIndex: "dealer.balance", key: "dealer.balance",render(value, record) {
      //   return <span>{record['dealer']['balance']}</span>
      // }},
      {title: "下一级数量", dataIndex: "dealer.child_count", key: "dealer.child_count",render(value, record) {
        return <span>{record['dealer']['child_count']}</span>
      }},
      {title: "状态", dataIndex: "dealer.state_name", key: "dealer.state_name",render(value, record) {
        return <span>{record['dealer']['state_name']}</span>
      }},

      {title: "创建时间", dataIndex: "dealer.created_at", key: "dealer.created_at",sorter: true,render(value, record) {
        return <span>{record['dealer']['created_at']}</span>
      }}

      // ,{
      //   title: '操作', key: 'operation', render: (item) => (
      //   <div className="actions">
      //     <Button type="primary" onClick={this.editForm.bind(this, item)}>编辑</Button>
      //     <Popconfirm title="确定删除？" placement="right"
      //                 onConfirm={this.deleteUsers.bind(this, {id: item.id})}>
      //       <Button style={{marginTop: "2px"}}>删除</Button>
      //     </Popconfirm>
      //   </div>
      // )
      // }
    ];

    const pagination = {
      showSizeChanger: true,
      current: parseInt(query.page) || 1,
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
        {/*<Row>*/}
          {/*<Col span={10}>*/}
            {/*<div style={{marginBottom: 16}} className="actions-control">*/}
              {/*<Popconfirm title="确定删除？" placement="right" onConfirm={this.deleteUsers.bind(this)}>*/}
                {/*<Button type="primary">删除</Button>*/}
              {/*</Popconfirm>*/}
            {/*</div>*/}
          {/*</Col>*/}
        {/*</Row>*/}
        <CustomTable
          loading={loading}
          columns={columns}
          dataSource={data.level1_dealers}
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
      data: state.fx_users.data,
      loading: state.fx_users.loading
    };
}

function mapDispatchToProps(dispatch) {
  return {
    getChildren: (params) => dispatch(getChildren(params)),
    deleteUsers:  (params) =>
    {
      dispatch(deleteUsers(params)).then(() => {
        dispatch(getUsers());
      })
    },
    pushQuery: (params) => {
      dispatch(push(params))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FxUsersChildrenIndex);
