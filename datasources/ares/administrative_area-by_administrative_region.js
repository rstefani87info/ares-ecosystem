
import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = 
	{
		name: "getAdministrativeAreasByAdministrativeRegion",
		path: "/ares/geo/administrative-areas/by-administrative-region/:administrative_region_id",
		transaction : true,
		methods: "get",
		connectionSetting: 'mysql_ares_geo', 
		parametersValidationRoles: (req,aReS)=>({
			administrative_region_id: {
				required: true,
				type: dataDescriptors.number,
				min: 1,
				max: 2000000000,
				pattern: /^[0-9]+$/,
				source: (req, name) => req.params[name] ?? req.query[name],
			}
		}),
		mapParameters : function(req,aReS) {
			return [req.parameters.administrative_region_id];
		},
	};


export default mapper;