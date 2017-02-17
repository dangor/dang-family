import App from './App'
import AuthCallback from './components/AuthCallback'
import Authenticated from './components/Authenticated'
import Home from './components/Home'
import Login from './components/Login'
import PageNotFound from './components/PageNotFound'
import ViewRouter from './components/ViewRouter'

const routes = {
  path: '/',
  component: App,
  indexRoute: {component: Home},
  childRoutes: [{
    path: 'login',
    component: Login
  }, {
    path: 'authCallback',
    component: AuthCallback
  }, {
    component: Authenticated,
    childRoutes: [{
      path: 'view/:key',
      component: ViewRouter
    }]
  }, {
    path: '*',
    component: PageNotFound
  }]
}

export default routes
