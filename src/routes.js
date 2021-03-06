import Admin from './components/admin'
import App from './App'
import Authenticated from './components/Authenticated'
import Home from './components/Home'
import Login from './components/Login'
import PageNotFound from './components/PageNotFound'
import TabletView from './components/tabletview'

const routes = {
  path: '/',
  component: App,
  indexRoute: {onEnter: (nextState, replace) => replace('/home')},
  childRoutes: [{
    path: 'login',
    component: Login
  }, {
    component: Authenticated,
    childRoutes: [{
      path: 'home',
      component: Home
    }, {
      path: 'admin',
      component: Admin
    }, {
      path: 'view/:key',
      component: TabletView
    }]
  }, {
    path: '*',
    component: PageNotFound
  }]
}

export default routes
