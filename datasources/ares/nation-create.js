import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = {
    name: "createNation",
    path: "/ares/geo/nations",
    transaction: true,
    methods: "post",
    connectionSetting: 'mysql_ares_geo',
    parametersValidationRoles: (req, aReS) => ({
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
        name_meaning: {
            required: true,
            type: dataDescriptors.text,
            maxLength: 255,
            source: (req, name) => req.body[name] || req.body.eng_name,
        },
        name_tags: {
            required: false,
            type: dataDescriptors.text,
            maxLength: 255,
            source: (req, name) => req.body[name],
        },
        iso3166_2_code: {
            required: true,
            type: dataDescriptors.text,
            maxLength: 2,
            source: (req, name) => req.body[name],
        },
        iso3166_3_code: {
            required: true,
            type: dataDescriptors.text,
            maxLength: 3,
            source: (req, name) => req.body[name],
        },
        iso3166_numeric_code: {
            required: true,
            type: dataDescriptors.number,
            min: 1,
            max: 999,
            source: (req, name) => req.body[name],
        },
        type: {
            required: true,
            type: dataDescriptors.text,
            enum: ['sovereign_state', 'partially_recognized_state', 'de_facto_state', 'dependency_or_overseas_territory', 'nation_without_a_state'],
            source: (req, name) => req.body[name],
        },
        surface_kmq: {
            required: false,
            type: dataDescriptors.number,
            source: (req, name) => req.body[name],
        },
        language: {
            required: false,
            type: dataDescriptors.text,
            maxLength: 5,
            source: (req, name) => req.body[name],
        },
        dependency_id: {
            required: false,
            type: dataDescriptors.number,
            min: 1,
            max: 2000000000,
            source: (req, name) => req.body[name],
        }
    }),
    mapParameters: function(req, aReS) {
        return [
            req.parameters.name_meaning,
            req.parameters.name_tags,
            req.parameters.eng_name,
            req.parameters.ita_name,
            req.parameters.spa_name,
            req.parameters.fra_name,
            req.parameters.deu_name,
            req.parameters.iso3166_2_code,
            req.parameters.iso3166_3_code,
            req.parameters.iso3166_numeric_code,
            req.parameters.type,
            req.parameters.surface_kmq,
            req.parameters.language,
            req.parameters.dependency_id
        ];
    },
};

export default mapper;