const api = {
  clientAccessToken: 'https://ecoconductor-dev-api-discovery.azurewebsites.net/client_access_token',
  createUser: 'https://ecoconductor-dev-api-account.azurewebsites.net/users',
  loginUser: 'https://ecoconductor-dev-api-account.azurewebsites.net/user_access_token',
  authenticateUser: 'https://ecoconductor-dev-api-account.azurewebsites.net/user_access_token',
  getBusinessUnits: 'https://lm-eco-dev.ecoconductor.com/api/businessunit/GetBusinessUnits',
  getApplications: 'https://lm-eco-dev.ecoconductor.com/api/application/GetApplications',
  getApplicationsSummary: 'https://lm-eco-dev.ecoconductor.com/api/application/GetApplicationsSummary',
  getApplication: 'https://lm-eco-dev.ecoconductor.com/api/application/GetApplication/',
  getSuppliers: 'https://lm-eco-dev.ecoconductor.com/api/supplier/GetSuppliers',
  getSuppliersSummary: 'https://lm-eco-dev.ecoconductor.com/api/supplier/GetSuppliersSummary',
  getSupplier: 'https://lm-eco-dev.ecoconductor.com/api/supplier/GetSupplier',
  getSupplierAgreements: 'https://lm-eco-dev.ecoconductor.com/api/supplier/GetSupplierAgreements',
  getSupplierApplications: 'https://lm-eco-dev.ecoconductor.com/api/supplier/GetSupplierApplications',
  getSupplierSoftwares: 'https://lm-eco-dev.ecoconductor.com/api/supplier/GetSupplierSoftwares',
  getAgreements: 'https://lm-eco-dev.ecoconductor.com/api/agreement/GetAgreements',
  getAgreementsSummary: 'https://lm-eco-dev.ecoconductor.com/api/agreement/GetAgreementsSummary',
  getAgreement: 'https://lm-eco-dev.ecoconductor.com/api/agreement/GetAgreement',
  getAgreementEntitlements: 'https://lm-eco-dev.ecoconductor.com/api/agreement/GetAgreementEntitlements',
  getAgreementProperties: function (id) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + id + '/component_properties'
  },
  updateAgreementProperties: function (payload) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId + '/component_properties'
  },
  updateComponentRelationships: function (payload) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId + '/component_relationships'
  },
  getAgreementRelationships: function (id) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + id + '/component_relationships'
  },
  addAgreement: 'https://ecoconductor-dev-api-model.azurewebsites.net/components',
  addEntitlement: 'https://ecoconductor-dev-api-model.azurewebsites.net/components',
  deleteAgreement: function (componentId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + componentId
  },
  getApplicationProperties: function (id) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + id + '/component_properties'
  },
  getApplicationRelationships: function (id) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + id + '/component_relationships'
  },
  getSoftwareProperties: function (id) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + id + '/component_properties'
  },
  getSoftwareRelationships: function (id) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + id + '/component_relationships'
  },
  viewComponentRelationship: function (payload) {
    if (payload.relationshipType === 'Parent') {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId + '/component_relationships/' + payload.relationshipId + '?parent=true'
    } else if (payload.relationshipType === 'Child') {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId + '/component_relationships/' + payload.relationshipId + '?child=true'
    } else {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId + '/component_relationships/' + payload.relationshipId
    }
  },
  deleteRelationship: function (payload) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId + '/component_relationships/' + payload.relationshipId
  },
  getComponentConstraints: function (componentId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + componentId + '/constraints'
  },
  getComponentTypeComponents: function (componentTypeId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + componentTypeId + '/components'
  },
  getSoftwares: 'https://lm-eco-dev.ecoconductor.com/api/software/GetSoftwares',
  getSoftwareSummary: 'https://lm-eco-dev.ecoconductor.com/api/software/GetSoftwaresSummary',
  getSoftware: 'https://lm-eco-dev.ecoconductor.com/api/software/GetSoftware/',
  getEntitlements: 'https://lm-eco-dev.ecoconductor.com/api/entitlement/GetEntitlements',
  getEntitlement: 'https://lm-eco-dev.ecoconductor.com/api/entitlement/GetEntitlement',
  getEntitlementsSummary: 'https://lm-eco-dev.ecoconductor.com/api/entitlement/GetEntitlementsSummary',
  getEntitlementById: function (id) {
    return 'https://lm-eco-dev.ecoconductor.com/api/entitlement/GetEntitlement/' + id
  },
  updateComponent: function (payload) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId
  }
}

export default api
