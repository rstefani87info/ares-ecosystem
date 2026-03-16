import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = {
    name: "checkCityCoordinates",
    path: "/ares/geo/cities/check-coordinates",
    transaction: false,
    methods: "get",
    connectionSetting: 'mysql_ares_geo',
    parametersValidationRoles: (req, aReS) => ({
        latitude: {
            required: true,
            type: dataDescriptors.number,
            min: -90,
            max: 90,
            source: (req, name) => req.query[name],
        },
        longitude: {
            required: true,
            type: dataDescriptors.number,
            min: -180,
            max: 180,
            source: (req, name) => req.query[name],
        },
        radius_km: {
            required: true,
            type: dataDescriptors.number,
            min: 0,
            max: 20000, // Massimo raggio di circa mezza circonferenza terrestre
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
        return [
            req.parameters.longitude,
            req.parameters.latitude,
            req.parameters.language,
            req.parameters.longitude,
            req.parameters.latitude,
            req.parameters.radius_km
        ];
    }
};

export default mapper;