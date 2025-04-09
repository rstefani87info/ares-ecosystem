import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = {
    name: "deleteExpressionMeaning",
    path: "/ares/i18n/expression-meanings",
    transaction: true,
    methods: "delete",
    connectionSetting: 'mysql_ares_geo',
    parametersValidationRoles: (req, aReS) => ({
        expression_id: {
            required: true,
            type: dataDescriptors.number,
            min: 1,
            max: 2000000000,
            pattern: /^[0-9]+$/,
            source: (req, name) => req.body[name],
        },
        meaning_id: {
            required: true,
            type: dataDescriptors.number,
            min: 1,
            max: 2000000000,
            pattern: /^[0-9]+$/,
            source: (req, name) => req.body[name],
        }
    }),
    mapParameters: function(req, aReS) {
        return [
            req.parameters.expression_id,
            req.parameters.meaning_id
        ];
    },
};

export default mapper;