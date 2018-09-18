const api = {
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
    getAgreementById: function (id) {
      return 'https://lm-eco-dev.ecoconductor.com/api/agreement/GetAgreement/' + id
    },
    getAgreementEntitlements: 'https://lm-eco-dev.ecoconductor.com/api/agreement/GetAgreementEntitlements',
    getSoftwares: 'https://lm-eco-dev.ecoconductor.com/api/software/GetSoftwares',
    getSoftwareSummary: 'https://lm-eco-dev.ecoconductor.com/api/software/GetSoftwaresSummary',
    getSoftware: 'https://lm-eco-dev.ecoconductor.com/api/software/GetSoftware/',
    getEntitlements: 'https://lm-eco-dev.ecoconductor.com/api/entitlement/GetEntitlements',
    getEntitlementsSummary: 'https://lm-eco-dev.ecoconductor.com/api/entitlement/GetEntitlementsSummary',
    getEntitlementById: function (id) {
      return 'https://lm-eco-dev.ecoconductor.com/api/entitlement/GetEntitlement/' + id
    }
  }

export default api
