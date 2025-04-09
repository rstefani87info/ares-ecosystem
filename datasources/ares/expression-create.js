import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = {
    name: "createExpression",
    path: "/ares/i18n/expressions",
    transaction: true,
    methods: "post",
    connectionSetting: 'mysql_ares_geo',
    parametersValidationRoles: (req, aReS) => ({
        eng_expression: {
            required: false,
            type: dataDescriptors.string,
            source: (req, name) => req.body[name],
        },
        ita_expression: {
            required: false,
            type: dataDescriptors.string,
            source: (req, name) => req.body[name],
        },
        spa_expression: {
            required: false,
            type: dataDescriptors.string,
            source: (req, name) => req.body[name],
        },
        fra_expression: {
            required: false,
            type: dataDescriptors.string,
            source: (req, name) => req.body[name],
        },
        deu_expression: {
            required: false,
            type: dataDescriptors.string,
            source: (req, name) => req.body[name],
        },
        por_expression: {
            required: false,
            type: dataDescriptors.string,
            source: (req, name) => req.body[name],
        },
        rus_expression: {
            required: false,
            type: dataDescriptors.string,
            source: (req, name) => req.body[name],
        },
        zho_expression: {
            required: false,
            type: dataDescriptors.string,
            source: (req, name) => req.body[name],
        },
        jpn_expression: {
            required: false,
            type: dataDescriptors.string,
            source: (req, name) => req.body[name],
        },
        kor_expression: {
            required: false,
            type: dataDescriptors.string,
            source: (req, name) => req.body[name],
        },
        ara_expression: {
            required: false,
            type: dataDescriptors.string,
            source: (req, name) => req.body[name],
        }
    }),
    mapParameters: function(req, aReS) {
        return [
            req.parameters.eng_expression,
            req.parameters.ita_expression,
            req.parameters.spa_expression,
            req.parameters.fra_expression,
            req.parameters.deu_expression,
            req.parameters.por_expression,
            req.parameters.rus_expression,
            req.parameters.zho_expression,
            req.parameters.jpn_expression,
            req.parameters.kor_expression,
            req.parameters.ara_expression
        ];
    },
};

export default mapper;