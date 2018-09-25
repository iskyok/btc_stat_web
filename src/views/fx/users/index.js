import React from 'react';
import {connect} from 'react-redux';
import CustomTable from '../../../components/CustomTable';
import {getUsers, deleteUsers} from '../../../reducers/actions/fx/users';
import {Input, Button, Popconfirm, Row, Col, Popover} from 'antd';
import {Link} from 'react-router';
import UserNew from './new.js';
import EditUpForm from './editupnew.js';
import EditCompany from './edit_company.js';
import EditSchool from './edit_school.js';
import Search from './search.js';
import {uploadProps} from '../../../utils/helper';
import {push} from 'react-router-redux';

const InputGroup = Input.Group;
var moment = require('moment');

export class FxUsersIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = {
      selectedRowKeys: [],
      showUpFormVisible: false,
      showFxEditCompanyFormVisible: false
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.location.query, this.props.location.query)) {
      this.props.getUsers(nextProps.location.query)
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

  //新建
  newForm(item) {
    this.refs.newForm.showModal(item)
  }

  //删除
  deleteUsers(data) {
    console.log(data.id, " ssssssssssssssssssdata.id")
    this.props.deleteUsers(data);
  }

//修改上级分销商，修改关系
  showFxUpForm(item) {
    this.setState({showUpFormVisible: true,itemId: item.id,itemData: item})
  }

  //关闭弹窗
  closeFxUpForm(){
    this.setState({showUpFormVisible: false})
  }

  //修改上级分销商，修改关系
  showFxEditCompanyForm(item) {
    this.setState({showFxEditCompanyFormVisible: true,itemId: item.id,itemData: item})
  }

  //关闭弹窗
  closeFxEditCompanyForm(){
    this.setState({showFxEditCompanyFormVisible: false})
  }

  //修改学校，修改关系
  showFxEditSchoolForm(item) {
    this.setState({showFxEditSchoolFormVisible: true,itemId: item.id,itemData: item})
  }

  //关闭弹窗
  closeFxEditSchoolForm(){
    this.setState({showFxEditSchoolFormVisible: false})
  }

  //解除分销函数导入 113

  render() {
    const {data ,loading} = this.props;
    let query = this.props.location.query;
    const columns = [
      {
        title: "ID", dataIndex: "id", key: "id", sorter: (a, b) => a.id - b.id, render(value, record) {
        return <span>{record['id']}</span>
      }
      },
      {
        title: "名称", dataIndex: "name", key: "name", render(value, record) {
        return <span>{record['account']['nickname']}</span>
      }
      },
      {
        title: "手机", dataIndex: "account.phone", key: "account.phone", render(value, record) {
        return <span>{record['account']['phone']}</span>
      }
      },  {
        title: "公司", dataIndex: "company.name", key: "account.name", render(value, record) {
        return <span>{record['company_name']}</span>
      }
      },
      {
        title: "学校", dataIndex: "school_name", key: "school_name", render(value, record) {
          return <span>{record['school_name']}</span>
        }
      },
      {
        title: "等级", dataIndex: "level.name", key: "level.name", render(value, record) {
        return <span>{record['level']['label']}</span>
      }
      },
      // {
      //   title: "升级状态", dataIndex: "upgrade_state_html", key: "upgrade_state_html", render(value, record) {
      //   return <span>{record['upgrade_state_html']}</span>
      // }
      // },
      {
        title: "上级分销商", dataIndex: "prev_dealer_name", key: "prev_dealer_name", render(value, record) {
        return <span>{record['prev_dealer_name']}</span>
      }
      },
      {
        title: "下一级人数", dataIndex: "dealer1_count", key: "dealer1_count", render(value, record) {
        return <span>{record['info']['dealer1_count']}</span>
      }
      },
      {
        title: "下二级人数", dataIndex: "dealer2_count", key: "dealer2_count", render(value, record) {
        return <span>{record['info']['dealer2_count']}</span>
      }
      },
      // {title: "总收入", dataIndex: "total_amount", key: "total_amount" ,render(value, record) {
      //   return <span>{record['total_amount']}</span>
      // }},
      // {title: "本月收入", dataIndex: "limit_withdraw_amount", key: "limit_withdraw_amount" ,render(value, record) {
      //   return <span>{record['limit_withdraw_amount']}</span>
      // }},
      // {title: "余额", dataIndex: "fx_bang_amount", key: "fx_bang_amount" ,render(value, record) {
      //   return <span>{record['fx_bang_amount']}</span>
      // }},
      {
        title: "邀请码", dataIndex: "invitation", key: "invitation", render(value, record) {
        return (<div>
          <p>{record['invitation']}</p>
          {/*<Popover content={<img src={record['qrcode_url']} className="qrcode_pic" />} title="二维码" trigger="hover">*/}
          {/*<Button>二维码</Button>*/}
          {/*</Popover>*/}
        </div>)
      }
      },
      {
        title: "状态", dataIndex: "state_name", key: "state_name", render(value, record) {
        return <span>{record['state_name']}</span>
      }
      },
      {
        title: "创建时间", dataIndex: "created_at", key: "created_at", render(value, record) {
        return <span>{record['created_at']}</span>
      }
      },


      {
        title: '操作', key: 'operation', render: (item) => (
        <div className="actions">
          {/* <a type="primary" onClick={this.editForm.bind(this, item)}>编辑</a>*/}
          <a><Link to={"/manage/fx/users/" + item.id + "/children"} state={item.id}>查看下级分销</Link></a>
          {/* <Popconfirm title="是否要解除该分销？" placement="right"
                      onConfirm={this.deleteUsers.bind(this, {id: item.id})}>
            <a style={{marginTop: "2px"}}>解除分销</a>
          </Popconfirm>*/}
          <a onClick={this.showFxUpForm.bind(this, item)}>修改分销关系</a>
          <a onClick={this.showFxEditCompanyForm.bind(this, item)}>修改分公司</a>
          <a onClick={this.showFxEditSchoolForm.bind(this, item)}>修改学校</a>
        </div>
      )
      }
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
        <Search></Search>
        {/*<Row>*/}
          {/*<Col span={10}>*/}
            {/*<div style={{marginBottom: 16}} className="actions-control">*/}
              {/*<Popconfirm title="确定删除？" placement="right" onConfirm={this.props.deleteUsers.bind(this)}>*/}
                {/*<Button type="primary">删除</Button>*/}
              {/*</Popconfirm>*/}
            {/*</div>*/}
          {/*</Col>*/}
        {/*</Row>*/}
        <CustomTable
          loading={loading}
          columns={columns}
          dataSource={data.users}
          pagination={pagination}
          rowKey={(record) => record.id}
          onChange={this.handleTableChange}
          rowSelection={rowSelection}
          bordered
        />
        {/*<UserNew ref="editForm" title="编辑分销商" formType="editForm"></UserNew>*/}
        {this.state.showUpFormVisible ? <EditUpForm ref="editUpForm" title="修改上级分销商" {...this.props} closeForm={this.closeFxUpForm.bind(this)} itemId={this.state.itemId} itemData={this.state.itemData} formType="editForm"></EditUpForm> : null}
        {this.state.showFxEditCompanyFormVisible ? <EditCompany ref="editUpForm" title="修改分公司"  {...this.props} closeForm={this.closeFxEditCompanyForm.bind(this)} itemId={this.state.itemId} itemData={this.state.itemData} formType="editForm"></EditCompany> : null}
        {this.state.showFxEditSchoolFormVisible ? <EditSchool ref="editUpForm" title="修改学校"  {...this.props} closeForm={this.closeFxEditSchoolForm.bind(this)} itemId={this.state.itemId} itemData={this.state.itemData} formType="editForm"></EditSchool> : null}
      </div>
    );
  }
}

//redux

function mapStateToProps(state) {
  // console.log(state.fx_users.data, "+++++++++------++state.fx_users.data")
  return {
    data: state.fx_users.data,
    loading: state.fx_users.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: (params) => dispatch(getUsers(params)),
    deleteUsers: (params) => {
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
)(FxUsersIndex);


