import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = {
    name: "getExpressionMeaningsList",
    path: "/ares/i18n/expression-meanings",
    transaction: false,
    methods: "get",
    connectionSetting: 'mysql_ares_geo',
    mapParameters: function(req, aReS) {
        return [];
    },
};

export default mapper;