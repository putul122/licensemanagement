const PackageResponseData = {
    'resources': [{
        'links': [],
        'meta_model': 8,
        'key': 'LM',
        'icon': null,
        'is_deleted': false,
        'component_types': [
          {
            'package': 1,
            'component_type': 956,
            'key': 'Supplier'
          },
          {
            'package': 1,
            'component_type': 961,
            'key': 'Agreement'
          },
          {
            'package': 1,
            'component_type': 975,
            'key': 'Entitlement'
          },
          {
            'package': 1,
            'component_type': 981,
            'key': 'Business Unit'
          },
          {
            'package': 1,
            'component_type': 1016,
            'key': 'Application'
          },
          {
            'package': 1,
            'component_type': 1022,
            'key': 'Software'
          },
          {
            'package': 1,
            'component_type': 1039,
            'key': 'Server Node'
          },
          {
            'package': 1,
            'component_type': 1041,
            'key': 'Technology Classification'
          }
        ],
        'component_type_properties': [
          {
            'package': 1,
            'component_type_property': 20128,
            'key': 'Agreement~Type'
          },
          {
            'package': 1,
            'component_type_property': 20131,
            'key': 'Agreement~Expiry Date'
          },
          {
            'package': 1,
            'component_type_property': 20133,
            'key': 'Agreement~Agreement Owner'
          },
          {
            'package': 1,
            'component_type_property': 20424,
            'key': 'Application~Cost'
          },
          {
            'package': 1,
            'component_type_property': 20431,
            'key': 'Application~Stage'
          },
          {
            'package': 1,
            'component_type_property': 20437,
            'key': 'Application~Application Owner'
          },
          {
            'package': 1,
            'component_type_property': 20439,
            'key': 'Application~Application Contact'
          },
          {
            'package': 1,
            'component_type_property': 21515,
            'key': 'Entitlement~Compliant'
          },
          {
            'package': 1,
            'component_type_property': 21516,
            'key': 'Entitlement~License Type'
          },
          {
            'package': 1,
            'component_type_property': 21517,
            'key': 'Entitlement~Purchased'
          },
          {
            'package': 1,
            'component_type_property': 21518,
            'key': 'Entitlement~Has Maintenance'
          },
          {
            'package': 1,
            'component_type_property': 21519,
            'key': 'Entitlement~Consumed'
          },
          {
            'package': 1,
            'component_type_property': 21521,
            'key': 'Entitlement~Allocated'
          },
          {
            'package': 1,
            'component_type_property': 21522,
            'key': 'Entitlement~Unit Cost'
          },
          {
            'package': 1,
            'component_type_property': 21523,
            'key': 'Entitlement~Total Cost'
          },
          {
            'package': 1,
            'component_type_property': 23079,
            'key': 'Software~End of Service Life'
          },
          {
            'package': 1,
            'component_type_property': 23080,
            'key': 'Software~Software Owner'
          }
        ],
        'connection_types': [
          {
            'package': 1,
            'connection_type': 375,
            'key': 'Is Supplied By (OEM)'
          },
          {
            'package': 1,
            'connection_type': 379,
            'key': 'Is Realized By'
          },
          {
            'package': 1,
            'connection_type': 380,
            'key': 'Is Managed By'
          },
          {
            'package': 1,
            'connection_type': 384,
            'key': 'Is Hosted At'
          },
          {
            'package': 1,
            'connection_type': 390,
            'key': 'Owns'
          },
          {
            'package': 1,
            'connection_type': 395,
            'key': 'Requires'
          },
          {
            'package': 1,
            'connection_type': 427,
            'key': 'Adheres To'
          },
          {
            'package': 1,
            'connection_type': 431,
            'key': 'Entitles'
          },
          {
            'package': 1,
            'connection_type': 439,
            'key': 'Implemented By'
          },
          {
            'package': 1,
            'connection_type': 451,
            'key': 'Uses'
          }
        ],
        'connection_type_properties': [],
        'constraints': [
          {
            'package': 1,
            'constraint': 3112,
            'key': 'Business Unit~Uses~Application'
          },
          {
            'package': 1,
            'constraint': 3120,
            'key': 'Business Unit~Owns~Application'
          },
          {
            'package': 1,
            'constraint': 3136,
            'key': 'Application~Is Managed By~Supplier'
          },
          {
            'package': 1,
            'constraint': 3287,
            'key': 'Supplier~Adheres To~Agreement'
          },
          {
            'package': 1,
            'constraint': 3337,
            'key': 'Agreement~Entitles~Entitlement'
          },
          {
            'package': 1,
            'constraint': 3347,
            'key': 'Software~Is Hosted At~Server Node'
          },
          {
            'package': 1,
            'constraint': 3582,
            'key': 'Technology Classification~Is Realized By~Software'
          },
          {
            'package': 1,
            'constraint': 3585,
            'key': 'Application~Requires~Software'
          },
          {
            'package': 1,
            'constraint': 3586,
            'key': 'Software~Is Supplied By (OEM)~Supplier'
          },
          {
            'package': 1,
            'constraint': 3587,
            'key': 'Entitlement~Implemented By~Software'
          },
          {
            'package': 1,
            'constraint': 3588,
            'key': 'Business Unit~Adheres To~Agreement'
          }
        ],
        'paths': [],
        'subscription': 83,
        'owner': null,
        'parent': null,
        'order': 0,
        'children': [],
        'id': 1,
        'name': 'License Manager',
        'description': null
      }
    ],
    'count': 1,
    'result_code': 0,
    'error_code': null,
    'error_source': null,
    'error_message': null,
    'links': []
  }
  export default PackageResponseData