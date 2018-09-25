import React from 'react'
import { Row, Col, Icon, Menu, Dropdown,Badge } from 'antd';
import { connect } from 'react-redux';
import  {logoutUser} from '../../../reducers/actions/auth'
import NoticeShow from '../../../views/notices/notices';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends React.Component {
  constructor () {
    super()
  }

  handleClick (e) {
    if(e.key=="setting:logout"){
      this.props.dispatch(logoutUser())
    }
  }

  render () {
//  const {user} = this.props
    return (
      <div className='ant-layout-header'>
        <Menu className="header-menu" onClick={this.handleClick.bind(this)}
              mode="horizontal">
          <SubMenu title={<span><Icon type="user" />未登录</span>}>
            <Menu.Item key="setting:1">个人信息</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="setting:logout">退出</Menu.Item>
          </SubMenu>
          <Menu.Item key="mail">
            <Icon type="question" />帮助
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default connect()(Header);
