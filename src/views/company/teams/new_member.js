import React from 'react';
import {
  Button,
  Checkbox,
  Radio,
  Switch,
  Upload,
  Icon,
  Cascader,
  TreeSelect,
  Select,
  Form,
  message,
  Input,
  Modal
} from 'antd';
import {
  getTeam,
  getTeamList,
  getTeams,
  addMember,
  createTeam,
  updateTeam
} from '../../../reducers/actions/company/teams';
import {connect} from 'react-redux';
import {API_CONFIG} from '../../../config/api';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
var _ = require('lodash');
require('es6-promise').polyfill();
import {uploadProps, requiredConf} from '../../../utils/helper';
import {push} from 'react-router-redux'

let MyForm = React.createClass({
  getInitialState() {
    return {
      priviewVisible: false,
      priviewImage: '',
      showUpload: '',
      imageUrl: '',
      Itemvisible: true,
      New: false,
      fetching: false,
      fromValue: '',
      visible: this.props.visible,
      parent_id: '',
      published: true,
      dataOptions: []
    };
  },

  componentDidMount() {
    console.log(this.state, this.props, this, '666666666');
    let itemId = this.props.itemId;
    if (itemId) {
      this.props.getItemData(itemId);
    }
    //this.props.getUpperData({});
  },
  componentWillUnmount(){
    // this.props.clearCategory()
  },
  componentWillReceiveProps(nextProps){
    console.log(nextProps, "333333333333333333props");
    if (this.props.itemData != nextProps.itemData) {
      console.log("pppp====", nextProps.itemData)
    }
  },
  handleSwitchChange(value) {
    this.setState({published: value})
  },
  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel()
    }
  },
  handleChange(value) {
    console.log(`selected ${value}`);
  },

  handleSubmit() {
    console.log(this.props.form.getFieldsValue());
    let {form} = this.props;
    let params = form.getFieldsValue();

    let itemId=this.props.location.query.id;
    form.validateFields((errors) => {
      if (errors) {
        return false;
      }
      // if (this.props.itemId) {
      //   this.props.updateItemData(this.props.itemId, params)
      // } else {
        this.props.createItemData(itemId,params);
      // }
      console.log("表单数据：", params)
      if (this.props.onSubmit) {
        this.props.onSubmit()
      }
    })
  },
  // 只展示最后一项
  displayRender(label) {
    return label[label.length - 1];
  },
  onCateChange(value){
    console.log(`分类选择 ${value}`);
  },
  getImageUrl(){
    return this.state.imageUrl;
  },
  upperChange(value){
    console.log("upper selected", value);
  },
  autoUpper(Upper){
    let UpperOp = [];
    for (let Op of Upper) {
      UpperOp.push(<Option key={Op[0]}>{Op[1]}</Option>)
    }
    return <Select style={{width: '100%'}}
                   searchPlaceholder="标签模式"
                   onChange={this.upperChange.bind(null, this)}
                   defaultValue={"顶级"}
    >
      { UpperOp }
    </Select>;
  },
  onTreeChange(value){
    // let old_state = this.state.form_value;
    // old_state.category_id = value;
    this.setState({
      parent_id: value
    })
  },
  render(){
    const {getFieldProps} = this.props.form;
    let children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    };
    var that = this;

    console.log("======11", this.props.upperData)
    return (
      <Modal title={this.props.title} visible={true} onOk={this.handleSubmit.bind(this)}
             onCancel={this.handleCancel.bind(this)}>
        <Form horizontal form={this.props.form}>

          <FormItem {...formItemLayout} label="手机号" help={"多手机号用英文逗号分割"}>
            <Input {...getFieldProps("phone", requiredConf())} type="textarea" autoComplete="off"/>

          </FormItem>
        </Form>
      </Modal>)
  }
})

function formMapStateToProps(state) {
  console.log(state.company_teams, "state.cms_categories ++++++++++++++")
  return {
    itemData: state.company_teams.itemData,
    upperData: state.company_teams.upperData
  };
}
//redux动作
function mapDispatchToProps(dispatch, ownProps) {
  return {
    getItemData: (id) => dispatch(getTeam(id)),
    createItemData: (id,params) => {
       dispatch(addMember(id,params)).then(() => {
        dispatch(getTeamList(ownProps.location.query))
      })
    },
    updateItemData: (id, params) => {
      dispatch(updateTeam(id, params)).then(() => {
        dispatch(getTeams(ownProps.location.query))
      })
    }
  }
}
MyForm = createForm({
  mapPropsToFields(props) {
    let result = {};
    if (props.formType === "newForm") {

      return result;

    } else {
      console.log(props.itemData, "props.itemData666666666666666666666")
      for (let prop in props.itemData) {
        result["team." + prop] = {value: props.itemData[prop]}
      }
      return result;
    }
  }
})(MyForm);

let CategoryNew = connect(formMapStateToProps, mapDispatchToProps, null, {withRef: true})(MyForm);


export default CategoryNew;
