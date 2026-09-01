import {MariaDB} from '@ares/datasource-mysql';
export const name = "maintenance";
export const environments = {
	test : {
		maintenance_db:{
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'ares_maintenance',
			driver: MariaDB,
			multipleStatements: true,
			queryExtensions:['sql'],
		}
	},
	production : {
		maintenance_db:{
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'ares_maintenance',
			driver: MariaDB,
			multipleStatements: true,
			queryExtensions:['sql']
		}
	} 


};