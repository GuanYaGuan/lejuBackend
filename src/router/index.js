import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: '主页',
      component: () => import('@/views/home/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },
  {
    path: '/privileges',
    component: Layout,
    redirect: '/privileges/account',
    name: '权限管理',
    meta: { title: '权限管理', icon: 'quanxian' },
    children: [
      {
        path: 'account',
        name: '账号管理',
        component: () => import('@/views/privileges/account/index'),
        meta: { title: '账号管理', icon: 'zhanghaoguanli' }
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/privileges/role/index'),
        meta: { title: '角色管理', icon: 'jiaoseguanli' }
      },
      {
        path: 'resource',
        name: '资源管理',
        component: () => import('@/views/privileges/resource/index'),
        meta: { title: '资源管理', icon: 'el-icon-s-operation' }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/list',
    name: '商品管理',
    meta: { title: '商品管理', icon: 'dashboard' },
    children: [
      {
        path: 'list',
        name: '商品列表',
        component: () => import('@/views/goods/list/index'),
        meta: { title: '商品列表', icon: 'el-icon-shopping-bag-1' }
      },
      {
        path: 'classify',
        name: '商品分类',
        component: () => import('@/views/goods/classify/index'),
        meta: { title: '商品分类', icon: 'el-icon-menu' }
      },
      {
        path: 'control',
        name: '品牌管理',
        component: () => import('@/views/goods/control/index'),
        meta: { title: '品牌管理', icon: 'el-icon-present' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/po',
    name: '订单管理',
    meta: { title: '订单管理', icon: 'el-icon-document' },
    children: [
      {
        path: 'po',
        name: '订单列表',
        component: () => import('@/views/order/po/index'),
        meta: { title: '订单列表', icon: 'el-icon-document-checked' }
      },
      {
        path: 'chargebacks',
        name: '退单列表',
        component: () => import('@/views/order/chargebacks/index'),
        meta: { title: '退单列表', icon: 'el-icon-document-delete' }
      },
      {
        path: 'address',
        name: '地址管理',
        component: () => import('@/views/order/address/index'),
        meta: { title: '地址管理', icon: 'el-icon-map-location' }
      }
    ]
  },
  {
    path: '/registration',
    component: Layout,
    redirect: '/registration/userlist',
    name: '注册用户管理',
    meta: { title: '注册用户管理', icon: 'el-icon-s-custom' },
    alwaysShow: true,
    children: [
      {
        path: 'userlist',
        name: '用户列表',
        component: () => import('@/views/registration/userlist/index'),
        meta: { title: '用户列表', icon: 'el-icon-user' }
      }
    ]
  },
  {
    path: '/sales',
    component: Layout,
    redirect: '/sales/limited',
    name: '营销管理',
    meta: { title: '营销管理', icon: 'el-icon-shopping-bag-2' },
    children: [
      {
        path: 'limited',
        name: '限时活动',
        component: () => import('@/views/sales/limited/index'),
        meta: { title: '限时活动', icon: 'el-icon-files' }
      },
      {
        path: 'advertised',
        name: '广告列表',
        component: () => import('@/views/sales/advertised/index'),
        meta: { title: '广告列表', icon: 'el-icon-document-copy' }
      }
    ]
  },
  {
    path: '/content',
    component: Layout,
    redirect: '/example/article',
    name: '内容管理',
    meta: { title: '内容管理', icon: 'el-icon-folder' },
    children: [
      {
        path: 'article',
        name: '文章列表',
        component: () => import('@/views/content/article/index'),
        meta: { title: '文章列表', icon: 'el-icon-document' }
      },
      {
        path: 'material',
        name: '素材列表',
        component: () => import('@/views/content/material/index'),
        meta: { title: '素材列表', icon: 'tupian' }
      }
    ]
  },
  {
    path: '/mine',
    component: Layout,
    redirect: '/mine/homepage',
    name: '个人中心',
    meta: { title: '个人中心', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'homepage',
        name: '个人主页',
        component: () => import('@/views/mine/homepage/index'),
        meta: { title: '个人主页', icon: 'el-icon-user' }
      },
      {
        path: 'edit',
        name: '个人设置1',
        component: () => import('@/views/mine/edit/index'),
        meta: { title: '个人设置', icon: 'el-icon-setting' }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/edit',
    name: '测试',
    meta: { title: '测试', icon: 'el-icon-setting' },
    alwaysShow: true,
    children: [
      {
        path: 'edit',
        name: '个人设置2',
        component: () => import('@/views/test/edit/index'),
        meta: { title: '个人设置', icon: 'el-icon-setting' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
