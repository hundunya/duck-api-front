export default [
  { path: '/', redirect: '/interface-list' },
  { layout: false, name: '登录', path: '/user/login', component: './User/Login' },
  { layout: false, name: '注册', path: '/user/register', component: './User/Register' },
  { name: '主页', path: '/interface-list', icon: 'home', component: './Interface/InterfaceList'},
  { path: '/interface-info', component: './Interface/InterfaceInfo' },
  {
    path: '/account',
    routes: [
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
      { name: '接口管理', icon: 'table', path: '/admin/interface-manage', component: './Admin/InterfaceManage' },
    ],
  },
  { path: '*', component: './404' },
];
