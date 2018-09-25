import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import Login from '../../Login/Login';
import {Link} from 'react-router';
import '../../../styles/App.scss';
import {Menu, Row, Breadcrumb, Icon ,Button} from 'antd';
import Header from './header';
import _ from "lodash";

const SubMenu = Menu.SubMenu;
import { all_permiss as menus } from "./menus";

class App extends Component {
  static propTypes = {
    children: PropTypes.element,
    isAuthenticated: React.PropTypes.bool,
    routing: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.renderAuthenticatedPage = this.renderAuthenticatedPage.bind(this);

    this.state = {
      collapse: false,
      selectedMenu: [],
      openKeys: []
    };
  }
  componentDidMount() {
    let currentRoute = this.props.routes[2]
    // 厂家管理
    // ------------------------   厂家列表    ------------------------ //
    if (_.includes(["company_business"], currentRoute.name)) {
      this.setState({openKeys: ["business"], selectedMenu: ["business_index"]})
    }
    // 管家管理
    // ------------------------   管家列表    ------------------------ //
    if (_.includes(["company_mind"], currentRoute.name)) {
      this.setState({openKeys: ["mind"], selectedMenu: ["mind_index"]})
    }
    // 统计系统 stat
    // ------------------------   用户统计    ------------------------ //
    if (_.includes(["user_stat_user"], currentRoute.name)) {
      this.setState({openKeys: ["stat"], selectedMenu: ["stat_users"]})
    }
    // ------------------------   公司统计    ------------------------ //
    if (_.includes(["user_stat_company"], currentRoute.name)) {
      this.setState({openKeys: ["stat"], selectedMenu: ["stat_company"]})
    }
    // ------------------------   订单统计    ------------------------ //
    if (_.includes(["user_stat_trade"], currentRoute.name)) {
      this.setState({openKeys: ["stat"], selectedMenu: ["stat_trades"]})
    }
    // ------------------------   商品统计    ------------------------ //
    if (_.includes(["user_stat_products"], currentRoute.name)) {
      this.setState({openKeys: ["stat"], selectedMenu: ["stat_products"]})
    }
    // ------------------------   子公司统计    ------------------------ //
    if (_.includes(["user_stat_sub_companies"], currentRoute.name)) {
      this.setState({openKeys: ["stat"], selectedMenu: ["stat_sub_companies"]})
    }

    // 分销系统 fx
    // ------------------------   全部用户    ------------------------ //
    if (_.includes(["fx_users" ,"fx_user_children" ], currentRoute.name)) {
      this.setState({openKeys: ["fx"], selectedMenu: ["fx_users"]})
    }
    // ------------------------   获利结算    ------------------------ //
    if (_.includes(["fx_tax_rates"], currentRoute.name)) {
      this.setState({openKeys: ["fx"], selectedMenu: ["fx_tax_rates"]})
    }
    // ------------------------   邀请记录    ------------------------ //
    if (_.includes(["fx_invites"], currentRoute.name)) {
      this.setState({openKeys: ["fx"], selectedMenu: ["fx_invites"]})
    }
    // ------------------------   分销订单    ------------------------ //
    if (_.includes(["fx_trades"], currentRoute.name)) {
      this.setState({openKeys: ["fx"], selectedMenu: ["fx_trades"]})
    }
    // ------------------------   分销等级    ------------------------ //
    if (_.includes(["fx_levels"], currentRoute.name)) {
      this.setState({openKeys: ["fx"], selectedMenu: ["fx_levels"]})
    }
  }

  //菜单项点击
  onMenuChange(item, key, selectedKeys) {
    this.setState({selectedMenu: [item.key]})
  }

  //菜单组点击
  onMenuOpenChange(keys) {
    this.setState({openKeys: keys})
  }

  _linkRender(route, params, routes, paths) {
    // console.log(route,params,routes,paths,window.location.pathname ,"66666666666666666666666666666");
    //判断paths是不是product/new 不是就直接二级目录

    console.log(paths, "path------------------+++++")
    if (paths[0] === "product/new") {
      return (
        <span className="product_new">
          <Link to="/manage/products">产品列表</Link>
              /
          <Link to="/manage/product/new">新建产品列表</Link>
        </span>
      )
    } else if (paths[0] === "product/edit") {
      return (
        <span className="product_new">
          <Link to="/manage/products">产品列表</Link>
              /
          <Link to="/manage/product/1/edit">修改产品列表</Link>
        </span>
      )
    } else if (/^.*children$/.test(paths[1])) {
      return (
        <span className="product_new">
          <Link to="/manage/fx/users">全部分销商</Link>
              /
          <Link to="/manage/fx/users/:id/children">下级分销商</Link>
        </span>
      )
    } else if (/^.*detail*/.test(paths[1])) {
      return (
        <span className="product_new">
          <Link to="/manage/trade">订单列表</Link>
              /
          <Link to="/manage/trade/details/:id">订单详情</Link>
        </span>
      )
    }
    return <Link to={"/" + paths.join('/')}>{route.breadcrumbName}</Link>
  }

  renderAuthenticatedPage() {
    return (
      <div className="ant-layout">
        <aside className="ant-layout-sider">
          <div className="ant-layout-logo">
            <img src={require('../../../static/images/logo.png')}></img>
            <span>Coins</span>
          </div>
          <Menu mode="inline"
                theme="dark"
                defaultSelectedKeys={['1']}
                onClick={this.onMenuChange.bind(this)}
                onOpenChange={this.onMenuOpenChange.bind(this)}
                selectedKeys={this.state.selectedMenu} openKeys={this.state.openKeys}>
            {
              menus.map((menu_item)=>{

                if(menu_item["visible"]){
                  if(!menu_item["children"] && menu_item["link"]){
                    return (<Menu.Item key={menu_item["local"]}>
                      <Link to={menu_item["link"]}>
                        <i className={"iconfont " + menu_item["icon"]}/>
                        {/*<Icon type="appstore" />/!*只有概况一个*!/*/}
                        {menu_item["label"]}
                      </Link></Menu.Item>)
                  }
                  return (<SubMenu key={menu_item["local"]}
                                   title={<span>
                                     <i className={"iconfont " + menu_item["icon"]}/>
                                     {menu_item["label"]}
                                   </span>}>
                    {
                      menu_item["children"].map((m_i_item)=>{
                        if(m_i_item["visible"]){
                          return (<Menu.Item key={m_i_item["local"]}>
                            <Link to={m_i_item["link"]}>
                              {m_i_item["label"]}
                            </Link></Menu.Item>)
                        }
                      })
                    }
                  </SubMenu>)
                }
                return null;
              })
            }
            {/*<SubMenu key="permission" title={<span><Icon type="switcher"/>权限控制</span>}>*/}
              {/*<Menu.Item key="permission_roles"><Link to="/manage/admin/roles"> 权限角色</Link></Menu.Item>*/}
              {/*<Menu.Item key="permission_users"><Link to="/manage/admin/users"> 权限用户</Link></Menu.Item>*/}
            {/*</SubMenu>*/}
          </Menu>
        </aside>
        <div className="ant-layout-main">
          <Header  {...this.props}/>
          <div className="ant-layout-breadcrumb">
            <Breadcrumb {...this.props} itemRender={this._linkRender.bind(this)}/>
          </div>
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              <div>
                {this.props.children}
              </div>
            </div>
          </div>
          <div className="ant-layout-footer">
            版权所有 © 2016 Coins
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {isAuthenticated} = this.props;
    return (
      <div>
        {isAuthenticated ? this.renderAuthenticatedPage() : <Login/>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {routing, auth: {isAuthenticated, user}} = state;
  return {
    isAuthenticated, user, routing
  };
}

export default connect(mapStateToProps)(App);
