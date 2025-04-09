import {MariaDB} from '@ares/datasource-mysql';
export const name = "ares";
export const environments = {
	test : {
		mysql_ares_geo:{
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'ares',
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
			database: 'ares',
			driver: MariaDB,
			multipleStatements: true,
			queryExtensions:['sql']
		}
	} 


};