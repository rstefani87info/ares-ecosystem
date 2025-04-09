import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = {
    name: "updateMeaning",
    path: "/ares/i18n/meanings/:id",
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
        meaning: {
            required: true,
            type: dataDescriptors.string,
            source: (req, name) => req.body[name],
        },
        tags: {
            required: false,
            type: dataDescriptors.string,
            source: (req, name) => req.body[name],
        },
        table_name: {
            required: false,
            type: dataDescriptors.string,
            source: (req, name) => req.body[name],
        },
        table_id: {
            required: false,
            type: dataDescriptors.number,
            min: 1,
            source: (req, name) => req.body[name],
        }
    }),
    mapParameters: function(req, aReS) {
        return [
            req.parameters.meaning,
            req.parameters.tags,
            req.parameters.table_name,
            req.parameters.table_id,
            req.parameters.id
        ];
    },
};

export default mapper;