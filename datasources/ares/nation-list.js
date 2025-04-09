
const mapper = 
	{
		name: "getNations",
		path: "/ares/geo/nations/list",
		transaction : true,
		methods: "get",
		connectionSetting: 'mysql_ares_geo', 
	};


export default mapper;