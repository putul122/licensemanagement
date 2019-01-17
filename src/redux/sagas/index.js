import watchBasic, {actionCreators as basicActions} from './basic/basicSaga'
import watchApplications, {actionCreators as applicationActions} from './application/applicationSaga'
import watchAgreements, {actionCreators as agreementActions} from './agreement/agreementSaga'
import watchSuppliers, {actionCreators as supplierActions} from './supplier/supplierSaga'
import watchSoftwares, {actionCreators as softwareActions} from './software/softwareSaga'
import watchEntitlements, {actionCreators as entitlementActions} from './entitlement/entitlementSaga'
import watchLoginUser, {actionCreators as loginActions} from './login/loginSaga'
import watchDiscussions, {actionCreators as discussionActions} from './discussion/discussionSaga'
import watchApplicationActivity, {actionCreators as applicationActivityActions} from './applicationActivity/applicationActivitySaga'
import watchModelActivity, {actionCreators as modelActions} from './model/modelSaga'
import watchCreateUser, {actionCreators as signUpActions} from './signUp/signUpSaga'
import watchComponentModalView, {actionCreators as componentModalViewActions} from './componentModalView/componentModalViewSaga'
import watchProjects, {actionCreators as projectActions} from './project/projectSaga'

export const actions = {
  basicActions,
  applicationActions,
  agreementActions,
  supplierActions,
  softwareActions,
  entitlementActions,
  loginActions,
  signUpActions,
  discussionActions,
  applicationActivityActions,
  modelActions,
  componentModalViewActions,
  projectActions
}
export default function * rootSaga () {
  yield [
    watchBasic(),
    watchApplications(),
    watchAgreements(),
    watchSuppliers(),
    watchSoftwares(),
    watchEntitlements(),
    watchLoginUser(),
    watchCreateUser(),
    watchDiscussions(),
    watchApplicationActivity(),
    watchModelActivity(),
    watchComponentModalView(),
    watchProjects()
  ]
}
