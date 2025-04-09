import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = {
    name: "updateExpressionMeaning",
    path: "/ares/i18n/expression-meanings",
    transaction: true,
    methods: "put",
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
        },
        case_tags: {
            required: false,
            type: dataDescriptors.string,
            source: (req, name) => req.body[name],
        },
        case_percentage: {
            required: false,
            type: dataDescriptors.number,
            min: 0,
            max: 100,
            source: (req, name) => req.body[name],
        }
    }),
    mapParameters: function(req, aReS) {
        return [
            req.parameters.case_tags,
            req.parameters.case_percentage,
            req.parameters.expression_id,
            req.parameters.meaning_id
        ];
    },
};

export default mapper;