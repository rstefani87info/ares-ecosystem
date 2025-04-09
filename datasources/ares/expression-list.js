import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = {
    name: "getExpressionsList",
    path: "/ares/i18n/expressions",
    transaction: false,
    methods: "get",
    connectionSetting: 'mysql_ares_geo',
    mapParameters: function(req, aReS) {
        return [];
    },
};

export default mapper;