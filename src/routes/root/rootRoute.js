import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppWrapper from '../../components/appWrapper/appWrapperComponent'

if (module.hot) {
  module.hot.accept()
}
export default class Root extends Component {
  constructor () {
    super()

    this.views = {}
  }

  loadView (fileName) {
    if (this.views[fileName]) {
      return this.views[fileName]
    }

    new Promise(resolve =>
      require.ensure([], require => {
        switch (fileName) {
          case 'home':
            if (module.hot) {
              module.hot.accept('../homePage/homePageRoute', () => {
                require('../homePage/homePageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../homePage/homePageRoute').default)
            break
          case 'dashboard':
            if (module.hot) {
              module.hot.accept('../dashboard/dashboardRoute', () => {
                require('../dashboard/dashboardRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../dashboard/dashboardRoute').default)
            break
          case 'suppliers':
            if (module.hot) {
              module.hot.accept('../suppliersPage/suppliersPageRoute', () => {
                require('../suppliersPage/suppliersPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../suppliersPage/suppliersPageRoute').default)
            break
          case 'supplierDetail':
            if (module.hot) {
              module.hot.accept('../supplierDetailPage/supplierDetailPageRoute', () => {
                require('../supplierDetailPage/supplierDetailPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../supplierDetailPage/supplierDetailPageRoute').default)
            break
          case 'agreements':
            if (module.hot) {
              module.hot.accept('../agreementsPage/agreementsPageRoute', () => {
                require('../agreementsPage/agreementsPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../agreementsPage/agreementsPageRoute').default)
            break
            case 'application':
            if (module.hot) {
              module.hot.accept('../applicationPage/applicationPageRoute', () => {
                require('../applicationPage/applicationPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../applicationPage/applicationPageRoute').default)
            break
          case 'applicationView':
            if (module.hot) {
              module.hot.accept('../applicationViewPage/applicationViewPageRoute', () => {
                        require('../applicationViewPage/applicationViewPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../applicationViewPage/applicationViewPageRoute').default)
            break
          case 'software':
            if (module.hot) {
              module.hot.accept('../softwarePage/softwarePageRoute', () => {
                        require('../softwarePage/softwarePageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../softwarePage/softwarePageRoute').default)
            break
          case 'softwareView':
            if (module.hot) {
              module.hot.accept('../softwareViewPage/softwareViewPageRoute', () => {
                        require('../softwareViewPage/softwareViewPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../softwareViewPage/softwareViewPageRoute').default)
            break
          default:
            break
        }
      })
    )
      .then(View => {
        this.views[fileName] = <View />
      })
      .then(() => this.forceUpdate())
      .catch(err => {
        console.error(err)
        throw new Error(err)
      })

    return <div />
  }
  render () {
    return (
      <AppWrapper>
        <BrowserRouter>
          <Switch>
            <Route path='/dashboard' exact component={(props) => this.loadView('dashboard')} />
            <Route path='/agreements' exact component={(props) => this.loadView('agreements')} />
            <Route path='/suppliers' exact component={(props) => this.loadView('suppliers')} />
            <Route path='/suppliers/:id' component={(props) => this.loadView('supplierDetail', props)} />
            <Route exact path='/applications' component={(props) => this.loadView('application', props)} />
            <Route exact path='/applications/:id' component={(props) => this.loadView('applicationView', props)} />
            <Route exact path='/softwares' component={(props) => this.loadView('software', props)} />
            <Route exact path='/softwares/:id' component={(props) => this.loadView('softwareView', props)} />
            <Route path='/applications' component={(props) => this.ApplicationsRoute(props)} />
            <Route path='/softwares' component={(props) => this.SoftwaresRoute(props)} />
            <Route path='/' exact component={(props) => this.loadView('home')} />
          </Switch>
        </BrowserRouter>
      </AppWrapper>
    )
  }
  // eslint-disable-line
  props: { // eslint-disable-line
    store: Object
  }
}
