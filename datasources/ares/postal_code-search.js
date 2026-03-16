import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = {
    name: "searchByPostalCode",
    path: "/ares/geo/cities/search-by-postal-code",
    transaction: false,
    methods: "get",
    connectionSetting: 'mysql_ares_geo',
    parametersValidationRoles: (req, aReS) => ({
        postal_code: {
            required: true,
            type: dataDescriptors.text,
            maxLength: 20,
            source: (req, name) => req.query[name],
        }
    }),
    mapParameters: function(req, aReS) {
        return [`%${req.parameters.postal_code}%`];
    }
};

export default mapper;