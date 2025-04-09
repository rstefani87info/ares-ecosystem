import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = {
    name: "createAdministrativeArea",
    path: "/ares/geo/administrative-areas",
    transaction: true,
    methods: "post",
    connectionSetting: 'mysql_ares_geo',
    parametersValidationRoles: (req, aReS) => ({
        id: {
            required: true,
            type: dataDescriptors.number,
            min: 1,
            max: 2000000000,
            pattern: /^[0-9]+$/,
            source: (req, name) => req.body[name],
        },
        en_name: {
            required: true,
            type: dataDescriptors.text,
            maxLength: 255,
            source: (req, name) => req.body[name],
        },
        it_name: {
            required: true,
            type: dataDescriptors.text,
            maxLength: 255,
            source: (req, name) => req.body[name],
        },
        surface_kmq: {
            required: false,
            type: dataDescriptors.number,
            source: (req, name) => req.body[name],
        },
        symbol: {
            required: false,
            type: dataDescriptors.text,
            maxLength: 5,
            source: (req, name) => req.body[name],
        },
        administrative_region_id: {
            required: true,
            type: dataDescriptors.number,
            min: 1,
            max: 2000000000,
            pattern: /^[0-9]+$/,
            source: (req, name) => req.body[name],
        },
        type: {
            required: true,
            type: dataDescriptors.text,
            enum: ['province', 'county', 'territory', 'local_government_areas', 'department', 'district'],
            source: (req, name) => req.body[name],
        }
    }),
    mapParameters: function(req, aReS) {
        return [
            req.parameters.id,
            req.parameters.en_name,
            req.parameters.it_name,
            req.parameters.surface_kmq,
            req.parameters.symbol,
            req.parameters.administrative_region_id,
            req.parameters.type
        ];
    },
};

export default mapper;