import Vue from 'vue'
import App from './App'
import router from './router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'echarts/theme/macarons.js'
import store from './store'

import {
  Pagination,
  Dialog,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Spinner,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Timeline,
  TimelineItem,
  Link,
  Divider,
  Image,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Spinner)
Vue.use(Badge)
Vue.use(Card)
Vue.use(Rate)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Link)
Vue.use(Divider)
Vue.use(Image)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

var axios = require('axios')
axios.defaults.baseURL = '/api'
// ???????????????????????????
axios.defaults.withCredentials = true

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(mavonEditor)

router.beforeEach((to, from, next) => {
    if (store.state.username && to.path.startsWith('/admin')) {
      initAdminMenu(router, store)
    }
    if (store.state.username && to.path.startsWith('/login')) {
      next({
        name: 'Dashboard'
      })
    }
    // ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    if (to.meta.requireAuth) {
      if (store.state.username) {
        axios.get('/authentication').then(resp => {
          if (resp) {
            next()
          }
        })
      } else {
        next({
          path: 'login',
          query: {redirect: to.fullPath}
        })
      }
    } else {
      next()
    }
  }
)

// http response ?????????
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // if (error) {
    //   store.commit('logout')
    //   router.replace('/login')
    // }
    // // ?????????????????????????????????
    // return Promise.reject(error)
  })

const initAdminMenu = (router, store) => {
  // ????????????????????????????????????
  if (store.state.adminMenus.length > 0) {
    return
  }
  axios.get('/menu').then(resp => {
   let res =  {"code":200,"message":"??????","result":[{"id":1,"path":"/admin","name":"AdminIndex","nameZh":"??????","iconCls":"el-icon-s-home","component":"AdminIndex","parentId":0,"children":[{"id":2,"path":"/admin/dashboard","name":"DashboardAdmin","nameZh":"????????????","iconCls":null,"component":"dashboard/admin/index","parentId":1,"children":[]}]},{"id":3,"path":"/admin","name":"User","nameZh":"????????????","iconCls":"el-icon-user","component":"AdminIndex","parentId":0,"children":[{"id":6,"path":"/admin/user/profile","name":"Profile","nameZh":"????????????","iconCls":null,"component":"user/UserProfile","parentId":3,"children":[]},{"id":7,"path":"/admin/user/role","name":"Role","nameZh":"????????????","iconCls":null,"component":"user/Role","parentId":3,"children":[]}]},{"id":4,"path":"/admin","name":"Content","nameZh":"????????????","iconCls":"el-icon-tickets","component":"AdminIndex","parentId":0,"children":[{"id":8,"path":"/admin/content/book","name":"BookManagement","nameZh":"????????????","iconCls":null,"component":"content/BookManagement","parentId":4,"children":[]},{"id":9,"path":"/admin/content/banner","name":"BannerManagement","nameZh":"????????????","iconCls":null,"component":"content/BannerManagement","parentId":4,"children":[]},{"id":10,"path":"/admin/content/article","name":"ArticleManagement","nameZh":"????????????","iconCls":null,"component":"content/ArticleManagement","parentId":4,"children":[]}]},{"id":5,"path":"/admin","name":"System","nameZh":"????????????","iconCls":"el-icon-s-tools","component":"AdminIndex","parentId":0,"children":[]}]}
         var fmtRoutes = formatRoutes(res.result)
         router.addRoutes(fmtRoutes)
         store.commit('initAdminMenu', fmtRoutes)
  })
}

const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/admin/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      meta: {
        requireAuth: true
      },
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: {App},
  template: '<App/>'
})
