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
  updateSuppliersProperties: function (payload) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId + '/component_properties'
  },
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
  getComponent: function (componentId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + componentId
  },
  getComponentProperty: function (componentId) {
      return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + componentId + '/component_properties'
  },
  getComponentRelationships: function (componentId) {
      return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + componentId + '/component_relationships'
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
  getApplicationSoftwares: 'https://lm-eco-dev.ecoconductor.com/api/application/GetApplicationSoftwares',
  getApplicationEntitlements: 'https://lm-eco-dev.ecoconductor.com/api/application/GetApplicationEntitlements',
  getSoftwareAgreements: 'https://lm-eco-dev.ecoconductor.com/api/software/GetSoftwareAgreements',
  getEntitlementById: function (id) {
    return 'https://lm-eco-dev.ecoconductor.com/api/entitlement/GetEntitlement/' + id
  },
  updateComponent: function (payload) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId
  },
  getDiscussions: 'https://ecoconductor-dev-api-notification.azurewebsites.net/discussions',
  getDiscussionMessages: function (id) {
      return 'https://ecoconductor-dev-api-notification.azurewebsites.net/discussions/' + id + '/messages'
  },
  getAccountArtefacts: 'https://account-eco-dev.ecoconductor.com/artefacts',
  getModelArtefacts: 'https://model-eco-dev.ecoconductor.com/artefacts',
  updateNotificationViewStatus: 'https://notification-eco-dev.ecoconductor.com/notification_view_status',
  getActivityMessage: function () {
    return 'https://ecoconductor-dev-api-notification.azurewebsites.net/messages'
  },
  getPackage: 'https://model-eco-dev.ecoconductor.com/model_packages/LM',
  createDiscussion: 'https://notification-eco-dev.ecoconductor.com/discussions',
  getModelPerspectives: 'https://model-eco-dev.ecoconductor.com/model_perspectives',
  updateModelPerspectives: function (metaModelPerspectiveId) {
    return 'https://model-eco-dev.ecoconductor.com/model_perspectives?meta_model_perspective_id=' + metaModelPerspectiveId
  },
  getComponentModelPerspectives: function (payload) {
    return 'https://model-eco-dev.ecoconductor.com/model_perspectives/' + payload.componentId + '?meta_model_perspective_id=' + payload.metaModelPerspectiveId
  },
  getMetaModelPerspective: function (perspectiveId) {
    return 'https://model-eco-dev.ecoconductor.com/meta_model_perspectives/' + perspectiveId
  },
  notificationURL: 'https://notification-eco-dev.ecoconductor.com/notification',
  iconURL: 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/',
  iconURL1: 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/1',
  iconURL18: 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/18',
  getProjectsSummary: 'https://lm-eco-dev.ecoconductor.com/api/project/GetProjectsSummary',
  getProjects: 'https://lm-eco-dev.ecoconductor.com/api/project/GetProjects',
  getProject: 'https://lm-eco-dev.ecoconductor.com/api/project/GetProject',
  createProject: 'https://ecoconductor-dev-api-model.azurewebsites.net/components',
  getProjectProperty: function (projectId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + projectId + '/component_properties'
  },
  updateProjectProperties: function (payload) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId + '/component_properties'
  },
  updateProjectEntitlements: function (projectId) {
    return ' https://lm-eco-dev.ecoconductor.com/api/project/UpdateProjectEntitlements?project_id=' + projectId
  },
  deleteProject: function (componentId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + componentId
  },
  getProjectEntitlements: 'https://lm-eco-dev.ecoconductor.com/api/project/GetProjectEntitlements',
  getAllModelPerspectives: function (payload) {
    return 'https://model-eco-dev.ecoconductor.com/model_perspectives?' + payload
  },
  getBusinessUnitsSummary: 'https://lm-eco-dev.ecoconductor.com/api/BusinessUnit/GetBusinessUnitsSummary',
  getBusinessUnit: 'https://lm-eco-dev.ecoconductor.com/api/BusinessUnit/GetBusinessUnit',
  getBusinessUnitAgreements: 'https://lm-eco-dev.ecoconductor.com/api/BusinessUnit/GetBusinessUnitAgreements',
  getBusinessUnitEntitlements: 'https://lm-eco-dev.ecoconductor.com/api/BusinessUnit/GetBusinessUnitEntitlements',
  getBusinessUnitOwnsApplications: 'https://lm-eco-dev.ecoconductor.com/api/BusinessUnit/GetBusinessUnitOwnsApplications',
  getBusinessUnitUsesApplications: 'https://lm-eco-dev.ecoconductor.com/api/BusinessUnit/GetBusinessUnitUsesApplications',
  updateBusinessUnitEntitlements: function (businessUnitId) {
    return ' https://lm-eco-dev.ecoconductor.com/api/BusinessUnit/UpdateBusinessUnitEntitlements?business_unit_id=' + businessUnitId
  },
  searchAll: 'https://lm-eco-dev.ecoconductor.com/api/global/SearchAll',
  updateApplicationEntitlements: function (applicationId) {
    return 'https://lm-eco-dev.ecoconductor.com/api/application/UpdateApplicationEntitlements?application_id=' + applicationId
  },
  updateApplicationSoftwares: function (applicationId) {
    return 'https://lm-eco-dev.ecoconductor.com/api/application/UpdateApplicationSoftwares?application_id=' + applicationId
  }
}

export default api
