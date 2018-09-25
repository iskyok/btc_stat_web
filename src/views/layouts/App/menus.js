// 菜单项 显示 所有 菜单项
let menus_visible = true;


// "children": [
//   {
//     "visible": menus_visible,
//     "label": "全部币" ,
//     "link": "/company/business",
//     "fetch": "menu_admin_business",
//     "local": "business_index"
//   }
// ]

export const all_permiss = [
  {
    "visible": menus_visible,
    "fetch": "home",
    "local": "home",
    "label": "概况" ,
    "link": "/company/home",
    "icon" : "iconfont-yemianguanli"
  },
  {
    "visible": menus_visible,
    "label": "全部币" ,
    "fetch": "side_shops",
    "local": "business",
    "link": "/manage/coin/coins",
    "icon" : "iconfont-gongchangguanli"
  },{
    "visible": menus_visible,
    "label": "消息动态" ,
    "fetch": "side_shops",
    "local": "news_feeds",
    "link": "/manage/coin/feeds",
    "icon" : "iconfont-gongchangguanli"
  },{
    "visible": menus_visible,
    "label": "交易平台" ,
    "fetch": "markets",
    "local": "markets",
    "link": "/manage/coin/markets",
    "icon" : "iconfont-gongchangguanli"
  },{
    "visible": menus_visible,
    "label": "投资机构" ,
    "fetch": "companies",
    "local": "companies",
    "link": "/manage/coin/companies",
    "icon" : "iconfont-gongchangguanli"
  }
]
