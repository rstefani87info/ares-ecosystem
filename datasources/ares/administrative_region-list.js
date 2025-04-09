
const mapper = 
	{
		name: "getAdministrativeRegions",
		path: "/ares/geo/administrative-regions/list",
		transaction : true,
		methods: "get",
		connectionSetting: 'mysql_ares_geo', 
	};


export default mapper;