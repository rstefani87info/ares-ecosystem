import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = {
    name: "deleteCity",
    path: "/ares/geo/cities/:id",
    transaction: true,
    methods: "delete",
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
        return [req.parameters.id, req.parameters.id];
    },
};

export default mapper;