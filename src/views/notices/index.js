import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import CustomTable from '../../components/CustomTable';
import { getNotices } from '../../reducers/actions/notices';
import { Input, Button, Popconfirm,Row, Col,Menu ,Tabs } from 'antd';

const InputGroup = Input.Group;
const TabPane = Tabs.TabPane;
var moment = require('moment');



export class NoticesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      selectedTabs:"all"
    };
  }

  componentDidMount() {
      this.props.getNotices(this.state.selectedTabs);
      console.log(this.state.selectedTabs , "65656565656565656")
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
    this.props.getNotices(params);
  }

  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }

  //标签切换
  handleClick(e) {
    console.log(e.key , this , "565656555555555")
    //设置当前标签的key值到state中
      this.setState({
        selectedTabs:e.key
      });
    console.log(this.state.selectedTabs , 'this.state.selectedTab6++5656+++++++')
    //判断当前state值，并且获取响应的数据
      this.props.getNotices(e.key);
  }
  //已阅
  LookUp(item){

  }

  render() {
    const { data } = this.props;
    const columns = [
      {title: "ID",dataIndex: "id",key: "id",render(value, record) {
        return <span>{record['is_read']? <span className="is_read_icon"> ● </span> : null }{record['id']}</span>
      }},
      {title: "消息时间",dataIndex: "create_time",key:"create_time",render(value, record) {
        return <span>{record['create_time']}</span>
      }},
      {title: "消息内容",dataIndex: "title",key: "title",render(value, record) {
        return <span>{record['title']}</span>
      }}
    ];

    const pagination = {
      showSizeChanger: true,
      total: data.meta.total_count,
      pageSize: data.meta.per_page,
      pageSizeOptions: ['1','10','20','40']
    };
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    //表格容器
    return (
      <div>
        <Menu onClick={this.handleClick.bind(this)}
              selectedKeys={[this.state.selectedTabs]}
              mode="horizontal"
              className="notices_menu"
        >
          <Menu.Item key="all">
            全部
          </Menu.Item>
          <Menu.Item key="read">
            已读
          </Menu.Item>
          <Menu.Item key="unread">
            未读
          </Menu.Item>
        </Menu>

        <div>
          <Row>
            <Col span={10}>
              <div style={{marginBottom: 16}} className="actions-control">
                <Popconfirm title="确定阅读？" placement="right" onConfirm={this.LookUp.bind(this)}>
                  <Button type="primary">已阅</Button>
                </Popconfirm>
              </div>
            </Col>
          </Row>
          <CustomTable
            columns={columns}
            dataSource={data.notices}
            pagination={pagination}
            rowKey={(record) => record.id}
            onChange={this.handleTableChange}
            rowSelection={rowSelection}
            bordered
          /></div>
      </div>
    );
  }
}

//redux
function mapStateToProps(state) {
  console.log("ggggggg",state.notices)
  return {data: state.notices.data};
}

function mapDispatchToProps(dispatch) {
  return {
    getNotices: (params) => dispatch(getNotices(params)),
    deleteUser: (params) => {
      dispatch(deleteUser(params)).then(()=> {
        dispatch(getNotices());
      });
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoticesIndex);
