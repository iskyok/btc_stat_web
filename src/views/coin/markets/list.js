import React from 'react';
import {connect} from 'react-redux';

import CustomTable from './../../../components/CustomTable';
import {Input,List,Avatar,Rate,Icon,Pagination, Button, Popconfirm, Row, Col} from 'antd';

const InputGroup = Input.Group;
var moment = require('moment');
import {Link} from 'react-router';

import {renderPercentTxt} from '../../../utils/helper';

export class MarketsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = {
      selectedRowKeys: []
    };
  }

  componentDidMount() {
  }

  handleTableChange(pagination, filters = {}, sorter = {}) {
    console.log("llllllll---",pagination)
    const pageParams = {page: pagination.current, per_page: pagination.pageSize};
    const filtersField = {};
    const sortParams = {};
    if (Object.keys(sorter).length !== 0) {
      const sortMethod = sorter.order === "descend" ? "desc" : "asc";
      sortParams['order'] = `${sorter.columnKey} ${sortMethod}`;
    }

    let old_params = this.props.location.query;
    console.log("ddddddddddd", old_params, this.props)
    const params = Object.assign({}, old_params, pageParams, filtersField, sortParams);
    // this.props.getStatMarkets(params);
    this.props.pushQuery({
      pathname: this.props.location.pathname,
      query: params
    });
  }

  onSelectChange(selectedRowKeys) {
    this.setState({selectedRowKeys});
  }

  render() {
    const {data} = this.props;

    console.log("dddd====",data)
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const pagination = {
      showSizeChanger: true,
      current: data.meta.current_page,
      total: data.meta.total_count,
      pageSize: data.meta.per_page,
      showTotal: function (total, range) {
        return `共计： ${total}条数据`
      },
      onChange: (page)=>{
        this.handleTableChange({current: page,pageSize: data.meta.per_page})
      },
      pageSizeOptions: ['1', '15', '20', '40','100']
    };
    const hasSelected = selectedRowKeys.length > 0;
    // CustomTable ant.design组件table ，添加滚动条scroll :{{x:1300}} 属性，
    // 因为列表项数据过多，数据单行加载不全，宽度1300 待修改
    // 另外缺点是后面的操作按钮，挤到列表的最后，不好操作
    // 考虑的方案是将操作放到列表头，方便操作
    return (
      <div>
        <div className="table-header2" >
          {/*<Pagination className="top-pagination" {...topPagination} onChange={(page)=>{this.handleTableChange({current: page,pageSize: topPagination.pageSize})}} onShowSizeChange={(page,pageSize)=>{this.handleTableChange({current: page,pageSize: pageSize})}}/>*/}
        </div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={pagination}
          dataSource={data.markets}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[<Rate value={item.star}/>,<span>国家：{item.country_name}</span>,<span>成交额(24h)： {item.amount24_cny}</span>,<span>支持： {item.tag_str}</span>]}

            >
              <List.Item.Meta
                // avatar={<Avatar src={item.avatar} />}
                title={<Link to={"/manage/coin/markets/"+item.code}>{item.name} 排名：{item.rank!=9999 ? item.rank : "无"}</Link>}
                description={item.desc}
              />
              {/*{item.content}*/}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default MarketsIndex;
