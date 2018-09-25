import React from 'react';
import {connect} from 'react-redux';
import CustomTable from '../../../components/CustomTable';
import {getLevels,deleteLevels} from '../../../reducers/actions/fx/levels';
import {Input,message,Button, Popconfirm, Row, Col} from 'antd';
import LevelNew from './new.js';
import Search from './search.js';
import LevelRuleNew from './levelRule.js';
import {uploadProps} from '../../../utils/helper';

const InputGroup = Input.Group;
var moment = require('moment');

export class FxLevelsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = {
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    this.props.getLevels();
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
  //升级
  editLevelRuleForm(item) {
    this.refs.editLevelRuleForm.showModal(item)
  }
//查看
  lookForm(item) {
    this.refs.lookForm.showModal(item)
  }
  //新建
  newForm(item) {
    this.refs.newForm.showModal(item)
  }
  //未选择数据
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
      {title: "ID", dataIndex: "id", key: "id" ,sorter: true,render(value, record) {
        return <span>{record['id']}</span>
      }},

       {title: "名称", dataIndex: "name", key: "name",render(value, record) {
         return <span>{record['label']}</span>
       }},

       {title: "星级", dataIndex: "star", key: "star" ,sorter: true,render(value, record) {
         return <span>{record['star']}</span>
       }},
      {title: "积分", dataIndex: "sort", key: "sort" ,sorter: true,render(value, record) {
         return <span>{record['l_score']}-{record['r_score']}</span>
       }},

       {title: "一级分销获利", dataIndex: "dealer1_percent", key: "dealer1_percent" ,sorter: true,render(value, record) {
         return <span>{record['dealer1_percent']}%</span>
       }},

       {title: "二级分销获利", dataIndex: "dealer2_percent", key: "dealer2_percent" ,sorter: true,render(value, record) {
         return <span>{record['dealer2_percent']}%</span>
       }},

      {
        title: '操作', key: 'operation', render: (item) => (
          <div className="actions">
            <a type="primary" onClick={this.lookForm.bind(this, item)}>查看</a>
            <a type="primary" onClick={this.editForm.bind(this, item)}>编辑</a>
            <a type="primary" onClick={this.editLevelRuleForm.bind(this, item)}>升级规则</a>

            <Popconfirm title="确定删除？" placement="right"
                        onConfirm={this.props.deleteLevels.bind(this, {id: item.id})}>
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
              dataSource={data.levels}
              pagination={pagination}
              rowKey={(record) => record.id}
              onChange={this.handleTableChange}
              rowSelection={rowSelection}
              bordered
          />
          <LevelNew ref="lookForm" title="查看" formType="lookForm"></LevelNew>
          <LevelNew ref="newForm" title="新建" formType="newForm"></LevelNew>
          <LevelNew ref="editForm" title="编辑" formType="editForm"></LevelNew>
          <LevelRuleNew ref="editLevelRuleForm" title="编辑升级规则" formType="editForm"></LevelRuleNew>
        </div>
    );
  }
}

//redux

function mapStateToProps(state) {
  return {data: state.fx_levels.data};
}

function mapDispatchToProps(dispatch) {
  return {
    getLevels: (params) => dispatch(getLevels(params)),
    deleteLevels:  (params) =>
    {
      dispatch(deleteLevels(params))
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
)(FxLevelsIndex);


