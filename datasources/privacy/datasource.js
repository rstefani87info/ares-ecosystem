import {MariaDB} from '@ares/datasource-mysql';
export const name = "privacy";
export const environments = {
	test : {
		mysql_ares_geo:{
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'ares_privacy',
			driver: MariaDB,
			multipleStatements: true,
			queryExtensions:['sql'],
		}
	},
	production : {
		mysql_ares_geo:{
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'ares_privacy',
			driver: MariaDB,
			multipleStatements: true,
			queryExtensions:['sql']
		}
	} 


};