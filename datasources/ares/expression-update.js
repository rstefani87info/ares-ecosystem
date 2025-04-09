import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = {
    name: "updateExpression",
    path: "/ares/i18n/expressions/:id",
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
        },
        grammatical_analysis: {
            required: false,
            type: dataDescriptors.string,
            source: (req, name) => req.body[name],
        },
        logical_analysis: {
            required: false,
            type: dataDescriptors.string,
            source: (req, name) => req.body[name],
        },
        tags: {
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
            req.parameters.ara_expression,
            req.parameters.hin_expression,
            req.parameters.tur_expression,
            req.parameters.nld_expression,
            req.parameters.pol_expression,
            req.parameters.vie_expression,
            req.parameters.tha_expression,
            req.parameters.ind_expression,
            req.parameters.msa_expression,
            req.parameters.fas_expression,
            req.parameters.ben_expression,
            req.parameters.grammatical_analysis,
            req.parameters.logical_analysis,
            req.parameters.tags,
            req.parameters.id
        ];
    },
};

export default mapper;