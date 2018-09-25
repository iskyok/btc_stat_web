import React from 'react';
import {Route, IndexRoute ,Redirect} from 'react-router';

// ruby自动生成

import HomePage from './views/HomePage/HomePage';

import  FxAppliesIndex from './views/fx/applies/index';
import  FxUsersChildrenIndex from './views/fx/users/children';

import App from './views/layouts/App/App.js';

import NotFoundPage from './components/NotFoundPage/NotFoundPage';


import  FxSettingsIndex from './views/fx/settings/index';
import  FxTaxRatesIndex from './views/fx/tax_rates/index';
import  FxInvitesIndex from './views/fx/invites/index';
import  FxTradesIndex from './views/fx/trades/index';
import  FxLevelsIndex from './views/fx/levels/index';

import  FxUsersIndex from './views/fx/users/index';
import  ImageManagesIndex from './views/image_manages/index';
import  ImageUploader from './views/shared/image_uploader';
import  ImageRegion from './views/shared/image_region';
import  NoticesIndex from './views/notices/index';
import  CityLocal from './views/location/local';


import UserRegisterIndex from './views/register/index';
import UserLoginIndex from './views/Login/Login';
import CompaniesIndex from './views/companies/index';
import CompanyTeamIndex from './views/company/teams/index';
import CompanyTeamList from './views/company/teams/list';

/* 统计模块 */
import StatUserIndex from './views/stat/users/index';
import StatCompanyIndex from './views/stat/companies/index';
import StatTradesIndex from './views/stat/trades/index';
import StatProductsIndex from './views/stat/products/index';
import StatSubCompaniesIndex from './views/stat/sub_companies/index';

//
import CoinCoinsIndex from './views/coin/coins/index';
import CoinMarketsShow from './views/coin/coins/show';
import CoinFeedsIndex from './views/coin/feeds/index';
import CoinMarketsIndex from './views/coin/markets/index';
import CoinCompaniesIndex from './views/coin/companies/index';
import MarketShow from './views/coin/markets/show';

// 管家管理
import MindIndex from './views/mind/index';
// 管家管理
import BusinessIndex from './views/businesses/index';

export default (
  <div>
    <Route name="register" path="/company/register" component={UserRegisterIndex}/>
    <Route name="login" path="/company/login" component={UserLoginIndex}/>
    <Route name="home" breadcrumbName="首页" path="/manage" component={App} onChange={(prevState, nextState) => {
      if (nextState.location.action !== "POP") {
        window.scrollTo(0, 0);
      }
    }}>
      <IndexRoute component={HomePage}/>
      <Route name="home" breadcrumbName="店铺首页" path="home"  components={HomePage}/>
      {/* 公司 */}
      <Route name="companies" breadcrumbName="公司列表" path="companies" components={CompaniesIndex}/>
      <Route name="company_teams" breadcrumbName="公司小组" path="company/teams" components={CompanyTeamIndex}/>
      <Route name="company_teams_list" breadcrumbName="小组成员" path="company/teams/list" components={CompanyTeamList}/>
      {/* 管家 管理 */}
      <Route name="company_mind" breadcrumbName="管家管理" path="mind" components={MindIndex}/>
      {/* 管家 管理 */}
      <Route name="company_business" breadcrumbName="管家管理" path="business" components={BusinessIndex}/>


      {/*分销关系*/}
      <Route name="fx_setting" breadcrumbName="分销设置" path="fx/settings" components={FxSettingsIndex}/>

      <Route breadcrumbName="申请分销商列表" path="fx/applies" components={FxAppliesIndex}/>
      <Route name="fx_users" breadcrumbName="全部分销商列表" path="fx/users" components={FxUsersIndex}/>
      <Route name="fx_user_children" breadcrumbName="下级分销商" path="fx/users/:id/children" components={FxUsersChildrenIndex}/>
      <Route name="fx_tax_rates" breadcrumbName="分销获利结算" path="fx/tax_rates" components={FxTaxRatesIndex}/>
      <Route name="fx_invites" breadcrumbName="分销邀请记录" path="fx/invites" components={FxInvitesIndex}/>
      <Route name="fx_trades" breadcrumbName="分销订单" path="fx/trades" components={FxTradesIndex}/>
      <Route name="fx_levels" breadcrumbName="用户等级" path="fx/levels" components={FxLevelsIndex}/>

      <Route breadcrumbName="图片管理" path="image" components={ImageManagesIndex}/>
      <Route breadcrumbName="图片管理" path="image_upload" components={ImageUploader}/>
      <Route breadcrumbName="图片管理" path="test" components={ImageRegion}/>
      <Route breadcrumbName="消息管理" path="notices" components={NoticesIndex}/>

      <Route name="user_stat_user" breadcrumbName="用户统计" path="stat/users" components={StatUserIndex}/>
      <Route name="user_stat_company" breadcrumbName="公司统计" path="stat/companies" components={StatCompanyIndex}/>
      <Route name="user_stat_trade" breadcrumbName="订单统计" path="stat/trades" components={StatTradesIndex}/>
      <Route name="user_stat_products" breadcrumbName="商品统计" path="stat/products" components={StatProductsIndex}/>

      <Route name="coin_coins" breadcrumbName="全部币" path="coin/coins" components={CoinCoinsIndex}/>
      <Route name="coin_feeds" breadcrumbName="新闻动态" path="coin/feeds" components={CoinFeedsIndex}/>
      <Route name="coin_markets" breadcrumbName="交易所" path="coin/markets" components={CoinMarketsIndex}/>
      <Route name="coin_market_show" breadcrumbName="交易所详细" path="coin/markets/:id" components={MarketShow}/>
      <Route name="coin_show" breadcrumbName="币详细" path="coin/coins/:id" components={CoinMarketsShow}/>
      <Route name="coin_companies_show" breadcrumbName="机构" path="coin/companies" components={CoinCompaniesIndex}/>

      <Route breadcrumbName="地址" path="city" components={CityLocal}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </div>
);
