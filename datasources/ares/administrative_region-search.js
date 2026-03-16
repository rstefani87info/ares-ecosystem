import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = {
    name: "searchAdministrativeRegions",
    path: "/ares/geo/administrative-regions/search",
    transaction: false,
    methods: "get",
    connectionSetting: 'mysql_ares_geo',
    parametersValidationRoles: (req, aReS) => ({
        text: {
            required: true,
            type: dataDescriptors.text,
            maxLength: 255,
            source: (req, name) => req.query[name],
        },
        language: {
            required: false,
            type: dataDescriptors.text,
            enum: ['eng', 'ita', 'spa', 'fra', 'deu'],
            default: 'eng',
            source: (req, name) => req.query[name],
        }
    }),
    mapParameters: function(req, aReS) {
        return [req.parameters.language, `%${req.parameters.text}%`];
    }
};

export default mapper;