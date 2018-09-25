import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getNoticeShow } from '../../reducers/actions/notices';
import { Popover,Icon, Menu, Button, Badge,Card } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


export class NoticeShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popVisible:false
    };
  }

  componentDidMount() {
    this.props.getNoticeShow();
  }



  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }
  autoCard(data){
    let result =[] ;
    if (data.length < 5){
      for (let item of data ){
        result.push(
          <Card title={item.create_time}>
            <p style={{"wordWrap": "breakWord"}}>{item.title}</p>
          </Card>
        )
      }
    }
    return result;
  }
  onClosePop(){
    this.setState({popVisible : false})
  }
  onVisibleChanged(){
    this.setState({popVisible : !this.state.popVisible})
  }



  render() {
    const { data } = this.props;

//显示容器
    let popContent = (
      <div className="popContent clearfix">
        {this.autoCard(data)}
        <Link to={'/manage/notices'}>
          <Button type="primary"
                  className="lookMoreBtn"
                  onClick={this.onClosePop.bind(this)}
          >查看更多</Button>
        </Link>
      </div>
    );
    return (
      <Popover content={popContent}
               title="我的消息"
               onVisibleChange={this.onVisibleChanged.bind(this)}
               visible={this.state.popVisible}
               >
        <Badge count={data.length} overflowCount={10} className="header_notice_btn">
          <Button type="primary">
            <Icon type="message"/>
            消息
          </Button>
        </Badge>
      </Popover>
    );
  }
}

//redux
function mapStateToProps(state) {
  // console.log("ggggggg",state.notices.data)
  return {data: state.notices.showData};
}

function mapDispatchToProps(dispatch) {
  return {
    getNoticeShow: (params) => dispatch(getNoticeShow(params)),
    // deleteUser: (params) => {
    //   dispatch(deleteUser(params)).then(()=> {
    //     dispatch(getNoticeShow());
    //   });
    // },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoticeShow);
