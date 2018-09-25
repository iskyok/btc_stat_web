import React from 'react';
import {Cascader ,Icon ,message} from 'antd';
import {connect} from 'react-redux';
import {getChildrenTypes, getTypes} from '../../reducers/actions/product/brands';

class CategoryCascader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      allTypes: [],
      old_selected_length:0, //数据库传递过来的length长度，小于这个长度的不可修改
      selected_ids: [],
      error: null
    }
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    this.props.getTypes({category_id: 0});
  }

  componentWillReceiveProps(nextProps) {
    //redux初始化分类
    if (this.props.typesData != nextProps.typesData) {
      this.setState({options: nextProps.typesData})
    }
    //已选择分类
    if (this.props.allTypes != nextProps.selectedTypes) {
      console.log(nextProps.selectedTypes,"33333333")
      this.setState({
        allTypes: nextProps.selectedTypes,
        old_selected_length : nextProps.selectedTypes.length
      })
    }
  }


  // 选择
  onTypeChange(value, items) {
    console.log(value, items, "列别选择");
    let oldSelected = this.state.allTypes;

    // 提交数据
    if (items.length >= 3) {
//判断选中值是否存在
      for (let i = 0; i < oldSelected.length; i++) {
        let result = [];
        oldSelected[i].map((cell) =>{
          result.push(cell.value)
        }); // 将以前选中的值得 所有value取出
        if (result.join(',') === value.join(',')) {
          //如果以前的值里面有 和当前选中值一样的KEY值时，抛出警告并且跳出，并不添加到选中值中
          message.error('选择值无效(已有选中值),请重新选择',2);
          return
        }
      }

      oldSelected.push(items);
      this.setState({
        allTypes: oldSelected
      });
    }
    //校验
    this.validate(oldSelected);
  }


  validate(allTypes=null) {
    allTypes=allTypes||this.state.allTypes
    if (this.props.required) {
      if (allTypes.length == 0){
        this.setState({error: "请选择分类"})
        return false
      }else{
        this.setState({error: null})
        return true
      }
    }
  }

  //异步加载数据
  loadBrandsData(selectedOptions) {
    console.log(selectedOptions, "select")
    let targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true;
    console.log("tttt111", targetOption)
    getChildrenTypes({category_id: targetOption.id}).then(data=> {
      targetOption.loading = false;
      let newData = data.categories
      console.log("dddd", newData)
      targetOption.children = newData
      console.log("eeee", targetOption.children)
      this.setState({
        options: [...this.state.options]
      })
    })
    console.log("xxxxx", targetOption)
  }

// 删除
  delectSelected(item) {
    console.log(item, '删除肚饿')
    let oldSelected = this.state.allTypes;
    let newSelected = [];
    for (let i in oldSelected) {
      if (oldSelected[i] === item) {
        continue
      }
      newSelected.push(oldSelected[i])
    }
    this.setState({
      allTypes: newSelected
    })
    //校验
    this.validate(newSelected);
  }

  // 获取所有第三分类id
  getSelectedIds() {
    let items=this.state.allTypes
    let result = [];
    items.map((item) => {
      let ids = [];
      item.map((obj)=> {
        ids.push(obj.id)
      })
      result.push(ids[2])
    })
    return result
  }

  render() {
// 选中的 类别
    let selectedTypes = this.state.allTypes;
    return (
      <div>
        <Cascader placeholder="请选择分类" options={this.state.options} loadData={this.loadBrandsData.bind(this)}
                  onChange={this.onTypeChange.bind(this)} value=""
                  matchInputWidth changeOnSelect/>
        {
          selectedTypes.map((item,index) => {
            let showLabel = [];
            item.map((obj) => {
              showLabel.push(obj.label)
            });
            return (<div style={{
              display: 'inline-block',
              marginRight: '12px',
              marginTop: '6px',
              padding: '0 6px',
              backgroundColor: '#e7f4fa',
              borderRadius: '6px',
              border: '1px solid #7bcdd8'
            }}>
              {showLabel.join('>')}
              <a
                //disabled={ !this.props.replace && index < this.state.old_selected_length }
                onClick={this.delectSelected.bind(this, item)}>
                <Icon type="close-circle"
                    style={{marginLeft:'12px',cursor:'pointer'}}
                    />
              </a>
            </div>)
          })
        }
        { this.state.error ?
            <p className="validate_tip">{this.state.error}</p> : null
        }
      </div>
    );
  }
}

function formMapStateToProps(state) {
  return {
    typesData: state.product_brands.typeData.categories
  };
}
//redux动作
function mapDispatchToProps(dispatch) {
  return {
    getTypes: (params) => dispatch(getTypes(params)),
  }
}

export default  connect(formMapStateToProps, mapDispatchToProps, null, {withRef: true})(CategoryCascader)
