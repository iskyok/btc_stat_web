import React from 'react'
import { Tabs,Menu } from 'antd';
import { connect } from 'react-redux';
import { Link,hashHistory } from 'react-router'
import change_header_tabs from '../../reducers/actions/layout'
const TabPane = Tabs.TabPane;

 function mapStateToProps(state) {
	  return {data: state.layout.data};
  }

 class HeaderTags extends React.Component {
  constructor (props) {
    super(props)
    this.state={
    	  data: this.props.data||[]
    }
  }

  render () {
  	    return (
  		   <Menu  mode="horizontal" defaultSelectedKeys={['.0']}>
             {(this.props.data||[]).map(item =><Menu.Item ><Link to={item.url}>{item.title}</Link></Menu.Item>)}
             </Menu>
		)
  }
 }
// export default HeaderTags;
export default connect(
mapStateToProps
)(HeaderTags);
