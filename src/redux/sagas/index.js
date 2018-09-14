import watchBasic, {actionCreators as basicActions} from './basic/basicSaga'
import watchApplications, {actionCreators as applicationActions} from './application/applicationSaga'
import watchAgreements, {actionCreators as agreementActions} from './agreement/agreementSaga'
import watchSuppliers, {actionCreators as supplierActions} from './supplier/supplierSaga'

export const actions = {
  basicActions,
  applicationActions,
  agreementActions,
  supplierActions
}
export default function * rootSaga () {
  yield [
    watchBasic(),
    watchApplications(),
    watchAgreements(),
    watchSuppliers()
  ]
}
