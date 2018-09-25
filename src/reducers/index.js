import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import stat_media from './stat/media';
import stat_users from './stat/user';
import stat_companies from './stat/company';
import stat_read from './stat/read';
import stat_spend from './stat/spend';
import stat_trades from './stat/trades';
import stat_interact from './stat/interact';
import stat_products from './stat/products';
import stat_sub_companies from './stat/sub_companies';
import coin_coins from './coin/coins';
import coin_feeds from './coin/feeds';
import coin_markets from './coin/markets';
import coin_concepts from './coin/concepts';
import coin_companies from './coin/companies';
// 自动生成import

import home from './home';
import mind from './mind'; // 管家管理
import businesses from './businesses'; // 厂家管理

import location_cities from './location/cities';

import fx_applies from './fx/applies';

import fx_users from './fx/users';
import fx_settings from './fx/settings';

import fx_tax_rates from './fx/tax_rates';

import fx_invites from './fx/invites';

import fx_trades from './fx/trades';

import fx_levels from './fx/levels';

import auth from './auth';
import notices from './notices';
import echarts from './echarts';
import companies from './companies/companies';
import company_teams from './company/teams';

const rootReducer = combineReducers({
  routing: routerReducer,
  location_cities,

  home,
  businesses,
  mind,

  fx_applies,
  fx_users,

  fx_settings,

  fx_tax_rates,

  fx_invites,

  fx_trades,

  fx_levels,
  auth,

  notices,
  echarts,
  companies,
  company_teams,
  stat_users,
  stat_companies,
  stat_trades,
  stat_products,
  stat_media,
  stat_spend,
  stat_read,
  stat_interact,
  stat_sub_companies,
  coin_coins,
  coin_feeds,
  coin_markets,
  coin_concepts,
  coin_companies
});

export default rootReducer;
