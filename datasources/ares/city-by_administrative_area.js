
import { dataDescriptors } from '@ares/core/dataDescriptors.js';

const mapper = 
	{
		name: "getCitiesByAdministrativeArea",
		path: "/ares/geo/cities/by-administrative-area/:administrative_area_id",
		transaction : true,
		methods: "get",
		connectionSetting: 'mysql_ares_geo', 
		parametersValidationRoles: (req,aReS)=>({
			administrative_area_id: {
				required: true,
				type: dataDescriptors.number,
				min: 1,
				max: 2000000000,
				pattern: /^[0-9]+$/,
				source: (req, name) => req.params[name] ?? req.query[name],
			}
		}),
		mapParameters : function(req,aReS) {
			return [req.parameters.administrative_area_id];
		},
		mapResult: (result,  i, request,aReS) => {
			result.postal_codes=result.postal_codes.split(",");
			return result;
		}
	};


export default mapper;