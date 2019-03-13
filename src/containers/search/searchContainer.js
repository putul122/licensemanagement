import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Search from '../../components/search/searchComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/searchReducer/searchReducerReducer'
import { actionCreators as componentModalViewActionCreators } from '../../redux/reducers/componentModalViewReducer/componentModalViewReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    searchText: state.searchReducer.searchText,
    currentPage: state.searchReducer.currentPage,
    perPage: state.searchReducer.perPage,
    searchData: state.searchReducer.searchData,
    searchAllResponse: state.searchReducer.searchAllResponse
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  searchAll: sagaActions.basicActions.searchAll,
  setCurrentPage: actionCreators.setCurrentPage,
  setPerPage: actionCreators.setPerPage,
  setSearchText: actionCreators.setSearchText,
  resetResponse: actionCreators.resetResponse,
  setSearchData: actionCreators.setSearchData,
  setModalSettings: componentModalViewActionCreators.setModalSettings
}

// If you want to use the function mapping
// export const propsMapping = (dispatch, ownProps) => {
//   return {
//     onClick: () => dispatch(actions.starsActions.FETCH_STARS)
//   }
// }
// eslint-disable-next-line
toastr.options = {
    'closeButton': false,
    'debug': false,
    'newestOnTop': false,
    'progressBar': false,
    'positionClass': 'toast-bottom-full-width',
    'preventDuplicates': false,
    'onclick': null,
    'showDuration': '300',
    'hideDuration': '1000',
    'timeOut': '4000',
    'extendedTimeOut': '1000',
    'showEasing': 'swing',
    'hideEasing': 'linear',
    'showMethod': 'fadeIn',
    'hideMethod': 'fadeOut'
  }

export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
      let paramsString = this.props.location.search
      let searchParams = new URLSearchParams(paramsString)
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let searchText = searchParams.get('search')
      let payload = {}
      payload.search = searchText
      payload.page_size = this.props.perPage
      payload.page = this.props.currentPage
      this.props.searchAll && this.props.searchAll(payload)
      this.props.setSearchText(searchText)
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentDidMount: function () {},
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.searchAllResponse && nextProps.searchAllResponse !== this.props.softwareRelationships) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.searchAllResponse.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.searchAllResponse.error_message, nextProps.searchAllResponse.error_code)
          this.props.history.push('/dashboard')
        } else {
          let searchData = nextProps.searchData
          if (nextProps.searchAllResponse.resources.length > 0) {
            nextProps.searchAllResponse.resources.forEach(function (data, index) {
              searchData.push(data)
            })
            nextProps.setSearchData(searchData)
          }
        }
        nextProps.resetResponse()
      }
    }
  })
)(Search)
