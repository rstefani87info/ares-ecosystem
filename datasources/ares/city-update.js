import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = {
    name: "updateCity",
    path: "/ares/geo/cities/:id",
    transaction: true,
    methods: "put",
    connectionSetting: 'mysql_ares_geo',
    parametersValidationRoles: (req, aReS) => ({
        id: {
            required: true,
            type: dataDescriptors.number,
            min: 1,
            max: 2000000000,
            pattern: /^[0-9]+$/,
            source: (req, name) => req.params[name],
        },
        eng_name: {
            required: true,
            type: dataDescriptors.text,
            maxLength: 255,
            source: (req, name) => req.body[name],
        },
        ita_name: {
            required: false,
            type: dataDescriptors.text,
            maxLength: 255,
            source: (req, name) => req.body[name],
        },
        spa_name: {
            required: false,
            type: dataDescriptors.text,
            maxLength: 255,
            source: (req, name) => req.body[name],
        },
        fra_name: {
            required: false,
            type: dataDescriptors.text,
            maxLength: 255,
            source: (req, name) => req.body[name],
        },
        deu_name: {
            required: false,
            type: dataDescriptors.text,
            maxLength: 255,
            source: (req, name) => req.body[name],
        },
        administrative_area_id: {
            required: false,
            type: dataDescriptors.number,
            min: 1,
            max: 2000000000,
            pattern: /^[0-9]+$/,
            source: (req, name) => req.body[name],
        },
        postal_codes: {
            required: false,
            type: dataDescriptors.text,
            maxLength: 255,
            source: (req, name) => req.body[name],
        },
        type: {
            required: false,
            type: dataDescriptors.text,
            maxLength: 255,
            source: (req, name) => req.body[name],
        },
        latitude: {
            required: false,
            type: dataDescriptors.number,
            source: (req, name) => req.body[name],
        },
        longitude: {
            required: false,
            type: dataDescriptors.number,
            source: (req, name) => req.body[name],
        }
    }),
    mapParameters: function(req, aReS) {
        const params = [
            req.parameters.administrative_area_id,
            req.parameters.postal_codes,
            req.parameters.type,
            req.parameters.latitude,
            req.parameters.longitude,
            req.parameters.id,
            req.parameters.eng_name,
            req.parameters.ita_name,
            req.parameters.spa_name,
            req.parameters.fra_name,
            req.parameters.deu_name
        ];
        return params;
    },
};

export default mapper;