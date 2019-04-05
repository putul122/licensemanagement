import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal'
const adalConfig = {
 tenant: 'a1l.co.za',
 clientId: 'fc7d8546-6836-4a79-8ff7-a7364c50d234',
 endpoints: {
   api: 'https://login.microsoftonline.com/1c557f17-ac27-40c1-a529-7a42bbce3d4d'
 },
 postLogoutRedirectUri: window.location.origin,
 redirectUri: window.location.origin + '/handleAzure',
 cacheLocation: 'localStorage'
}

var _oauthData = { isAuthenticated: false, userName: '', loginError: '', profile: '' }

export const authContext = new AuthenticationContext(adalConfig)

export const getToken = () => {
 return authContext.getCachedToken(authContext.config.clientId)
}

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options)

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api)

export const login = () => authContext.login()

export const logout = () => authContext.logout()

export const processAdalCallback = () => {
  var hash = window.location.hash

  if (authContext.isCallback(hash)) {
    // callback can come from login or iframe request
    var requestInfo = authContext.getRequestInfo(hash)
    authContext.saveTokenFromHash(requestInfo)
    window.location.hash = ''

    if (requestInfo.requestType !== authContext.REQUEST_TYPE.LOGIN) {
      if (window.parent.AuthenticationContext === 'function' && window.parent.AuthenticationContext()) {
        authContext.callback = window.parent.AuthenticationContext().callback
      }
      if (requestInfo.requestType === authContext.REQUEST_TYPE.RENEW_TOKEN) {
        authContext.callback = window.parent.callBackMappedToRenewStates[requestInfo.stateResponse]
      }
    }

    if (requestInfo.stateMatch) {
      if (typeof authContext.callback === 'function') {
        // Call within the same context without full page redirect keeps the callback
        if (requestInfo.requestType === authContext.REQUEST_TYPE.RENEW_TOKEN) {
          // Idtoken or Accestoken can be renewed
          if (requestInfo.parameters['access_token']) {
            authContext.callback(authContext._getItem(authContext.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters['access_token'])
          } else if (requestInfo.parameters['id_token']) {
            authContext.callback(authContext._getItem(authContext.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters['id_token'])
          }
        }
      } else {
        // normal full login redirect happened on the page
        updateDataFromCache(authContext.config.loginResource)
        if (_oauthData.userName) {
          // IDtoken is added as token for the app
          window.setTimeout(function () {
            updateDataFromCache(authContext.config.loginResource)
            // redirect to login requested page
            var loginStartPage = authContext._getItem(authContext.CONSTANTS.STORAGE.START_PAGE)
            if (loginStartPage) {
              window.location.path(loginStartPage)
            }
          }, 1)
        }
      }
    }
  }
}

var updateDataFromCache = (resource) => {
  // only cache lookup here to not interrupt with events
  var token = authContext.getCachedToken(resource)
  _oauthData.isAuthenticated = token !== null && token.length > 0
  var user = authContext.getCachedUser() || { userName: '' }
  _oauthData.userName = user.userName
  _oauthData.profile = user.profile
  _oauthData.loginError = authContext.getLoginError()
}
