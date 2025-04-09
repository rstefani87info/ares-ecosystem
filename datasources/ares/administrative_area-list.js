
const mapper = 
	{
		name: "getAdministrativeAreas",
		path: "/ares/geo/administrative-areas/list",
		transaction : true,
		methods: "get",
		connectionSetting: 'mysql_ares_geo', 
	};


export default mapper;