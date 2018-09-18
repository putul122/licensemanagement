import watchBasic, {actionCreators as basicActions} from './basic/basicSaga'
import watchApplications, {actionCreators as applicationActions} from './application/applicationSaga'
import watchAgreements, {actionCreators as agreementActions} from './agreement/agreementSaga'
import watchSuppliers, {actionCreators as supplierActions} from './supplier/supplierSaga'
import watchSoftwares, {actionCreators as softwareActions} from './software/softwareSaga'
import watchEntitlements, {actionCreators as entitlementActions} from './entitlement/entitlementSaga'

export const actions = {
  basicActions,
  applicationActions,
  agreementActions,
  supplierActions,
  softwareActions,
  entitlementActions
}
export default function * rootSaga () {
  yield [
    watchBasic(),
    watchApplications(),
    watchAgreements(),
    watchSuppliers(),
    watchSoftwares(),
    watchEntitlements()
  ]
}
