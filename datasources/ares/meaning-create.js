import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = {
    name: "createMeaning",
    path: "/ares/i18n/meanings",
    transaction: true,
    methods: "post",
    connectionSetting: 'mysql_ares_geo',
    parametersValidationRoles: (req, aReS) => ({
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
            req.parameters.table_id
        ];
    },
};

export default mapper;