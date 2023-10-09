export default [
  { path: '/', redirect: '/welcome' },
  { layout: false, name: '登录', path: '/user/login', component: './User/Login' },
  { layout: false, name: '注册', path: '/user/register', component: './User/Register' },
  { name: '主页', path: '/welcome', icon: 'smile', component: './Welcome'},
  { path: '/pay', component: './Pay'},
  {
    name: '接口仓库',
    path: '/interface',
    icon: 'home',
    routes: [
      { path: '/interface', redirect: '/interface/list' },
      { path: '/interface/list', component: './Interface/InterfaceList'},
      { path: '/interface/info', component: './Interface/InterfaceInfo' },
    ]
  },
  {
    access: 'canUser',
    name: '商城',
    path: '/mall',
    icon: 'PayCircleOutlined',
    routes: [
      { path: '/mall', redirect: '/mall/goods' },
      { path: '/mall/goods', component: './Mall/Goods'},
    ],
  },
  {
    access: 'canUser',
    name: '订单记录',
    path: '/order',
    icon: 'icon-order',
    routes: [
      { path: '/order', redirect: '/order/list' },
      { path: '/order/list', component: './Order/OrderList'},
      { path: '/order/info', component: './Order/OrderInfo' },
    ]
  },
  {
    path: '/account',
    routes: [
      { path: '/account', redirect: '/account/center' },
      { name: '个人中心', path: '/account/center', component: './Account/Information' },
      { name: '个人设置', path: '/account/settings', component: './Account/Settings' },
    ],
  },
  {
    name: '管理页',
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/interface-manage' },
      { name: '接口管理', path: '/admin/interface-manage', component: './Admin/InterfaceManage' },
      { name: '商品管理', path: '/admin/mall-manage', component: './Admin/MallManage' },
      // { name: '用户管理', path: '/admin/user-manage', component: './Admin/UserManage' },
    ],
  },
  { path: '*', component: './404' },
];
