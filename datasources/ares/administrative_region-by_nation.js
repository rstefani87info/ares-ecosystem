
import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = 
	{
		name: "getAdministrativeRegionsByNation",
		path: "/ares/geo/administrative-regions/by-nation/:nation_id",
		transaction : true,
		methods: "get",
		connectionSetting: 'mysql_ares_geo', 
		parametersValidationRoles: (req,aReS)=>({
			nation_id: {
				required: true,
				type: dataDescriptors.number,
				min: 1,
				max: 2000000000,
				pattern: /^[0-9]+$/,
				source: (req, name) => req.params[name] ?? req.query[name],
			}
		}),
		mapParameters : function(req,aReS) {
			return [req.parameters.nation_id];
		},
	};


export default mapper;