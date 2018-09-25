import React from 'react';
import {connect} from 'react-redux';

// import {getImages} from '../../reducers/actions/images';
import {Input ,Cascader} from 'antd';




export class LocalCascader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options:[]
    };
  }


  //区域选择事件
  onChange(value, selectedOptions) {
    console.log('checked= ', value, selectedOptions ,this.state);
    let Oldoption = this.state.options;
    let NewOption = Oldoption;

    this.setState({
      options:NewOption
    });
  }
  render() {
    let { data } = this.props;

    return (
      <Cascader
        options={this.state.options}
        onChange={this.onChange.bind(this)}
        notFoundContent="请选择区域"
        changeOnSelect
      />
    );
  }
}

//redux
function mapStateToProps(state) {
  // return {data: state.images.data};
}

function mapDispatchToProps(dispatch) {
  return {
    // deleteAccount: (params) => {
    //   dispatch(deleteAccount(params)).then(() => {
    //     dispatch(getImages());
    //   });
    // },
    // getImages: (params) => {
    //   dispatch(getImages(params))
    // },
    // getGroups: (params) => {
    //   dispatch(getGroups())
    // },
    // saveGroupItemData: (params)=>{
    //   dispatch(saveGroup(params)).then(()=> {
    //     dispatch(getGroups())
    //   })
    // },
    // updateImage: (params)=>{
    //   dispatch(updateImage(params)).then(()=> {
    //     dispatch(getImages())
    //   })
    // },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocalCascader);
