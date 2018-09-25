import React, {Component} from 'react';
import {Form, Radio, Input, DatePicker, Checkbox, Row, Col, Select, Button} from 'antd';
import {push} from 'react-router-redux'
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
import {connect} from 'react-redux';
import {getDateRange, getDateRangeByYear} from '../../../utils/helper';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;


class SearchPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modeType: 0,
      dateRangeMode: "all",
      dateMode: 2,
      market_value: "all",
      concept_id: "all",
      start_date: "", end_date: "", dateRange: null
    };
  }


  componentDidMount() {
    // this.props.getCompanies({});
  }


  handleSubmit() {
    let params = this.props.form.getFieldsValue() || {};

    if (this.state.dateRange && this.state.dateRange.length > 1) {
      params["from_date"] = this.state.dateRange[0].format("YYYY-MM-DD");
      params["to_date"] = this.state.dateRange[1].format("YYYY-MM-DD");
    }
    console.log("data: 搜索参数22", params, this.props)
    params["page"] = 1;
    if(this.state.priceFilter!=="all"){
      if(this.state.priceFilter=="break"){
        params["is_break"]=true
      }
    }
    if(this.state.market_value!=="all"){
        params["market_value_range"]=this.state.market_value.join(",")
    }
    if(this.state.concept_id!=="all"){
        params["concept_id"]=this.state.concept_id
    }
    this.props.pushQuery({
      pathname: this.props.pathname,
      query: params
    })
  }

  clearForm(e) {
    e.preventDefault();
    this.props.form.resetFields();
    this.setState({dateRange: []})
    this.setState({dateRangeMode: ""})
    this.setState({dateRangeYearMode: ""})
    this.props.pushQuery({
      pathname: this.props.pathname
    })
  }

  // 选择日期范围
  dateChange(value1, value2) {
    console.log("ddd===", value1)
    this.setState({dateRange: value1},()=>{
      this.handleSubmit()
    });
  }

  onDayRangeChange(e) {
    let dayType = e.target.value;
    let range=[]
    if(dayType!="all") {
       range = getDateRange(dayType);
    }
    this.setState({dateRangeMode: dayType,dateRangeYearMode: "",dateRange: range},()=>{
      this.handleSubmit()
    })
  }

  onDayRangeYearChange(e) {
    let year = e.target.value;
    let range=[]
    if(year!="all"){
     range= getDateRangeByYear(year);
    }
    this.setState({dateRangeYearMode: year,dateRangeMode: "",dateRange: range},()=>{
      this.handleSubmit()
    })
  }

  onDayModeChange(e) {
    let modeType = e.target.value;
    this.setState({dateMode: modeType})
  }

  onSelectChange(data) {
    console.log("ssss===", data)
  }

  onPriceFilterChange(e){
    let type = e.target.value;
    this.setState({priceFilter: type},()=>{
      this.handleSubmit()
    })
  }

  setMarketValueRanges(e){
    let market_value = e.target.value;
    console.log("ooo---",market_value)
    this.setState({market_value: market_value},()=>{
      this.handleSubmit()
    })
  }

  setConceptId(e){
    let concept_id = e.target.value;
    console.log("ooo---",concept_id)
    this.setState({concept_id: concept_id},()=>{
      this.handleSubmit()
    })
  }

  render() {
    let {companiesData} = this.props;
    const {getFieldProps} = this.props.form;

    console.log("ooooo----", companiesData);
    return (
      <Form horizontal>
        <Row gutter={16}>
          <Col sm={8}>
            <FormItem id="tag" label="发行时间" labelCol={{span: 6}} wrapperCol={{span: 14}}>
              <RangePicker value={this.state.dateRange} allowClear={false} onChange={this.dateChange.bind(this)}/>
            </FormItem>
          </Col>
          <Col sm={8}>
            <FormItem label="最近发行" labelCol={{span: 6}} wrapperCol={{span: 18}}>
              <RadioGroup value={this.state.dateRangeMode} onChange={this.onDayRangeChange.bind(this)} >
                <RadioButton value="all">全部</RadioButton>
                <RadioButton value="latest_week">最近7天</RadioButton>
                <RadioButton value="latest_month">最近30天</RadioButton>
                <RadioButton value="latest_3month">最近3个月</RadioButton>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col sm={8}>
            <FormItem label="按年发行" labelCol={{span: 6}} wrapperCol={{span: 18}}>
              <RadioGroup value={this.state.dateRangeYearMode} onChange={this.onDayRangeYearChange.bind(this)}>
                <RadioButton value="all">全部</RadioButton>
                <RadioButton value="2013">2013</RadioButton>
                <RadioButton value="2014">2014</RadioButton>
                <RadioButton value="2015">2015</RadioButton>
                <RadioButton value="2016">2016</RadioButton>
                <RadioButton value="2017">2017</RadioButton>
                <RadioButton value="2018">2018</RadioButton>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col sm={8}>
            <FormItem id="tag" label="是否破发" labelCol={{span: 6}} wrapperCol={{span: 14}}>
              <RadioGroup value={this.state.priceFilter} onChange={this.onPriceFilterChange.bind(this)}>
                <RadioButton value="all">全部</RadioButton>
                <RadioButton value="break">破发</RadioButton>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col sm={8}>
            <FormItem id="tag" label="大交易所" labelCol={{span: 6}} wrapperCol={{span: 14}}>
              <RadioGroup value={this.state.priceFilter} onChange={this.onPriceFilterChange.bind(this)}>
                <RadioButton value="all">全部</RadioButton>
                <RadioButton value="break">是</RadioButton>
                <RadioButton value="break">否</RadioButton>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col sm={24}>
            <FormItem label="当前市值/美元" labelCol={{span: 3}} wrapperCol={{span: 18}}>
              <RadioGroup defaultValue="all" value={this.state.market_value} onChange={this.setMarketValueRanges.bind(this)}>
                <RadioButton value="all">全部</RadioButton>
                { this.props.filterData.marketValueRanges.map((item)=>{
                    return <RadioButton value={item.value}>{item.name+"("+ item.count +")"}</RadioButton>
                 })
                }
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col sm={24}>
            <FormItem label="概念" labelCol={{span: 3}} wrapperCol={{span: 18}}>
              <RadioGroup defaultValue="all" value={this.state.concept_id} onChange={this.setConceptId.bind(this)}>
                <RadioButton value="all">全部</RadioButton>
                { this.props.conceptsData.concepts.map((item)=>{
                    return <RadioButton value={item.id}>{item.name+"("+ item.coin_count +")"}</RadioButton>
                 })
                }
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={12} style={{textAlign: 'right'}}>
            {/*<Button type="primary" onClick={this.handleSubmit.bind(this)}>搜索</Button>*/}
            <Button onClick={this.clearForm.bind(this)}>清除条件</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

let Search = Form.create({withRef: true})(SearchPanel);

export  default  Search;
