import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = {
    name: "searchLocalities",
    path: "/ares/geo/localities/search",
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
        const searchPattern = `%${req.parameters.text}%`;
        return [
            req.parameters.language,
            searchPattern,
            req.parameters.language,
            searchPattern,
            req.parameters.language,
            searchPattern,
            searchPattern
        ];
    }
};

export default mapper;