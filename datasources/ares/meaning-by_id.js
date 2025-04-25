import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = {
    name: "getMeaningById",
    path: "/ares/i18n/meanings/details/:id",
    transaction: false,
    methods: "get",
    connectionSetting: 'mysql_ares_geo',
    parametersValidationRoles: (req, aReS) => ({
        id: {
            required: true,
            type: dataDescriptors.number,
            min: 1,
            max: 2000000000,
            pattern: /^[0-9]+$/,
            source: (req, name) => req.params[name],
        }
    }),
    mapParameters: function(req, aReS) {
        return [req.parameters.id];
    },
};

export default mapper;