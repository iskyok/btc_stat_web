import React from 'react';
import {connect} from 'react-redux';
import CustomTable from '../../../components/CustomTable';
import {getTaxRates,saveTaxRate,updateTaxRate,deleteTaxRates ,deleteTaxRatesSuccess} from '../../../reducers/actions/fx/tax_rates';
import {Input, Button, Popconfirm, Row, Col} from 'antd';
import TaxRateNew from './new.js';
import Search from './search.js';
import {uploadProps} from '../../../utils/helper';
import {push} from 'react-router-redux';

const InputGroup = Input.Group;
var moment = require('moment');

export class FxTaxRatesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = {
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    this.props.getTaxRates();
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.location.query, this.props.location.query)) {
      this.props.getTaxRates(nextProps.location.query)
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
  deleteTaxRates() {

  }

  render() {
    const {data} = this.props;
    const columns = [
      {title: "ID", dataIndex: "id", key: "id" ,sorter: true,render(value, record) {
        return <span>{record['id']}</span>
      }},

       {title: "账户", dataIndex: "tr_account", key: "tr_account",render(value, record) {
         return <span>{record['tr_account']}</span>
       }},

       {title: "名称", dataIndex: "user.name", key: "user.name",render(value, record) {
         return <span>{record['user']['name']}</span>
       }},

       {title: "月份", dataIndex: "date", key: "date",render(value, record) {
         return <span>{record['date']}</span>
       }},

       {title: "计税金额", dataIndex: "total_amount", key: "total_amount",render(value, record) {
         return <span>{record['total_amount']}</span>
       }},

       {title: "扣税", dataIndex: "amount", key: "amount",render(value, record) {
         return <span>{record['amount']}</span>
       }},

       {title: "余额转入", dataIndex: "balance_income", key: "balance_income",render(value, record) {
         return <span>{record['balance_income']}</span>
       }},

       {title: "是否结算", dataIndex: "state_name", key: "state_name",render(value, record) {
         return <span>{record['state_name']}</span>
       }},

       {title: "创建时间", dataIndex: "created_at", key: "created_at",sorter: true,render(value, record) {
         return <span>{record['created_at']}</span>
       }},

      {
        title: '操作', key: 'operation', render: (item) => (
          <div className="actions">
            <a type="primary" onClick={this.editForm.bind(this, item)}>编辑</a>
            <Popconfirm title="确定删除？" placement="right"
                        onConfirm={this.props.deleteTaxRates.bind(this, {id: item.id})}>
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
                <Popconfirm title="确定删除？" placement="right" onConfirm={this.props.deleteTaxRates.bind(this)}>
                  <Button type="primary">删除</Button>
                </Popconfirm>
              </div>
            </Col>
          </Row>
          <CustomTable
              columns={columns}
              dataSource={data.tax_rates}
              pagination={pagination}
              rowKey={(record) => record.id}
              onChange={this.handleTableChange}
              rowSelection={rowSelection}
              bordered
          />
          <TaxRateNew ref="newForm" title="新建" formType="newForm"></TaxRateNew>
          <TaxRateNew ref="editForm" title="编辑" formType="editForm"></TaxRateNew>
        </div>
    );
  }
}

//redux

function mapStateToProps(state) {
  return {data: state.fx_tax_rates.data};
}

function mapDispatchToProps(dispatch) {
  return {
    getTaxRates: (params) => dispatch(getTaxRates(params)),
    deleteTaxRates:  (params) =>
    {
        dispatch(getTaxRates(params));
    },
    pushQuery: (params) => {
      dispatch(push(params))
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FxTaxRatesIndex);


