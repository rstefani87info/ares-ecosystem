
const mapper = 
	{
		name: "getCities",
		path: "/ares/geo/cities/list",
		transaction : true,
		methods: "get",
		connectionSetting: 'mysql_ares_geo', 
		mapResult: (result,  i, request,aReS) => {
			result.postal_codes=result.postal_codes.split(",");
			return result;
		}
	};


export default mapper;