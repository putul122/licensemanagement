import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppWrapper from '../../components/appWrapper/appWrapperComponent'
import { runWithAdal } from 'react-adal'
import { authContext } from '../../config/adal'
const DO_NOT_LOGIN = false

if (module.hot) {
  module.hot.accept()
}
export default class Root extends Component {
  constructor () {
    super()

    this.views = {}
  }

  loadView (fileName, props) {
    if (this.views[fileName]) {
      return this.views[fileName]
    }

    new Promise(resolve =>
      require.ensure([], require => {
        switch (fileName) {
          case 'handleAzure':
            if (module.hot) {
              module.hot.accept('../handleAzurePage/handleAzurePageRoute', () => {
                require('../handleAzurePage/handleAzurePageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../handleAzurePage/handleAzurePageRoute').default)
          break
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
          case 'agreementDetail':
            if (module.hot) {
              module.hot.accept('../agreementDetailPage/agreementDetailPageRoute', () => {
                require('../agreementDetailPage/agreementDetailPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../agreementDetailPage/agreementDetailPageRoute').default)
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
          case 'applicationDetail':
            if (module.hot) {
              module.hot.accept('../applicationDetailPage/applicationDetailPageRoute', () => {
                        require('../applicationDetailPage/applicationDetailPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../applicationDetailPage/applicationDetailPageRoute').default)
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
          case 'softwareDetail':
            if (module.hot) {
              module.hot.accept('../softwareDetailPage/softwareDetailPageRoute', () => {
                        require('../softwareDetailPage/softwareDetailPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../softwareDetailPage/softwareDetailPageRoute').default)
            break
          case 'account':
            runWithAdal(authContext, () => {
              if (module.hot) {
                module.hot.accept('../accountPage/accountPageRoute', () => {
                  require('../accountPage/accountPageRoute').default // eslint-disable-line
                  this.forceUpdate()
                })
              }
              resolve(require('../accountPage/accountPageRoute').default)
            }, DO_NOT_LOGIN)
            break
          case 'entitlement':
            if (module.hot) {
              module.hot.accept('../entitlementsPage/entitlementsPageRoute', () => {
                        require('../entitlementsPage/entitlementsPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../entitlementsPage/entitlementsPageRoute').default)
            break
          case 'entitlementDetail':
            if (module.hot) {
              module.hot.accept('../entitlementDetailPage/entitlementDetailPageRoute', () => {
                        require('../entitlementDetailPage/entitlementDetailPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../entitlementDetailPage/entitlementDetailPageRoute').default)
            break
          case 'projectDetail':
            if (module.hot) {
              module.hot.accept('../projectDetailPage/projectDetailPageRoute', () => {
                        require('../projectDetailPage/projectDetailPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../projectDetailPage/projectDetailPageRoute').default)
            break
          case 'sheets':
            if (module.hot) {
              module.hot.accept('../sheetsPage/sheetsPageRoute', () => {
                        require('../sheetsPage/sheetsPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../sheetsPage/sheetsPageRoute').default)
            break
          case 'landing':
            if (module.hot) {
              module.hot.accept('../landingPage/landingPageRoute', () => {
                        require('../landingPage/landingPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../landingPage/landingPageRoute').default)
            break
          default:
            break
        }
      })
    )
      .then(View => {
        this.views[fileName] = <View {...props} />
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
            <Route path='/dashboard' exact component={(props) => this.loadView('dashboard', props)} />
            <Route path='/agreements' exact component={(props) => this.loadView('agreements', props)} />
            <Route path='/agreements/:id' component={(props) => this.loadView('agreementDetail', props)} />
            <Route path='/suppliers' exact component={(props) => this.loadView('suppliers', props)} />
            <Route path='/suppliers/:id' component={(props) => this.loadView('supplierDetail', props)} />
            <Route exact path='/applications' component={(props) => this.loadView('application', props)} />
            <Route exact path='/applications/:id' component={(props) => this.loadView('applicationDetail', props)} />
            <Route exact path='/softwares' component={(props) => this.loadView('software', props)} />
            <Route exact path='/softwares/:id' component={(props) => this.loadView('softwareDetail', props)} />
            <Route exact path='/entitlements' component={(props) => this.loadView('entitlement', props)} />
            <Route exact path='/entitlements/:id' component={(props) => this.loadView('entitlementDetail', props)} />
            <Route exact path='/projects/:id' component={(props) => this.loadView('projectDetail', props)} />
            <Route exact path='/account' component={(props) => this.loadView('account', props)} />
            <Route exact path='/handleAzure' component={(props) => this.loadView('handleAzure', props)} />
            <Route exact path='/sheets' component={(props) => this.loadView('sheets', props)} />
            <Route path='/' exact component={(props) => this.loadView('landing', props)} />
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
