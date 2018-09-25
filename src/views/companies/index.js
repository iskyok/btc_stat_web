import React from 'react';
import { connect } from 'react-redux';

import CustomTable from './../../components/CustomTable';
import { getCompanies} from '../../reducers/actions/companies/companies';
import { Input, Button, Popconfirm,Row, Col ,message ,Popover} from 'antd';
import { Link } from 'react-router';
import {push} from 'react-router-redux'

const InputGroup = Input.Group;
var moment = require('moment');



export class CompaniesIndex extends React.Component {
	constructor(props) {
		super(props);
		this.handleTableChange = this.handleTableChange.bind(this);
		this.onSelectChange = this.onSelectChange.bind(this);
		this.state = {
			selectedRowKeys: []
		};
	}

	componentDidMount() {
//查询
		if (!!this.props.location.query.page){
			let params = undefined;
			params=this.props.location.query
			this.props.getCompanies(params);
		}else{
			this.props.getCompanies();
		}
	}
	componentWillReceiveProps(nextProps) {
		if (!_.isEqual(nextProps.location.query, this.props.location.query)) {
			this.props.getCompanies(nextProps.location.query)
		}
	}

	handleTableChange(pagination, filters = {}, sorter = {}) {
		const pageParams = { page: pagination.current, per_page: pagination.pageSize };
		const filtersField = {};
		const sortParams = {};
		if (Object.keys(sorter).length !== 0) {
			const sortMethod = sorter.order === "descend" ? "desc" : "asc";
			sortParams['sorts'] = `${sorter.columnKey} ${sortMethod}`;
		}

		let params = Object.assign({}, pageParams, filtersField, sortParams);
		console.log('查询参数【】【】[][][][][',params)
// 查询 参数
		this.props.pushQuery({
			pathname: this.props.location.pathname,
			query: params
		})
	}

	onSelectChange(selectedRowKeys) {
		this.setState({ selectedRowKeys });
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
	deleteBusinesses(){

	}

	render() {
		const data = this.props.data;
		let query = this.props.location.query;
		const columns = [
			{title: "ID",dataIndex: "id",key: "id"},
			{title: "公司名称",dataIndex: "name",key: "name",render(value, record) {
				return <span>{record['name']}</span>
			}},

			{title: "总用户数",dataIndex: "users_count",key: "users_count",render(value, record) {
				return <span>{record['users_count']}</span>
			}},
			{title: "邀请码",dataIndex: "invitation",key: "invitation",render(value, record) {
				return <span>{record['invitation']}</span>
			}},
			{title: "邀请二维码",dataIndex: "qrcode_url",key: "qrcode_url",render(value, record) {
				return <Popover content={<img src={record['qrcode_url']} className="img200"/>}
				                title={record['name']}
				                trigger="hover">
						<span className="look_qrcode">查看二维码</span>
					</Popover>
			}},
			{
				title: '操作', key: 'operation', render: (item) => (
				<div className="opts">

				</div>
			)}
		];

		const pagination = {
			showSizeChanger: true,
			total: data.meta.total_count,
			current:parseInt(query.page)||1,
			pageSize: data.meta.per_page,
			pageSizeOptions: ['1','10','20','40']
		};
		const { selectedRowKeys } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};

		return (
			<div>
				<CustomTable
					columns={columns}
					dataSource={data.companies}
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
	return {data: state.companies.data};
}

function mapDispatchToProps(dispatch) {
	return {
		getCompanies: (params) => dispatch(getCompanies(params)),
		// deleteBusiness: (params) => {
		// 	dispatch(deleteBusiness(params)).then(()=> {
		// 		dispatch(getCompanies());
		// 	});
		// },
		pushQuery: (params)=>{
			dispatch(push(params))
		}
	};
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CompaniesIndex);
