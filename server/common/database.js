import logger from "./loggerService.js";
import mysql from "mysql";

var connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATBASE
});


export function withConnection() {
	return new Promise((resolve, reject) => {
		try {
			if(!connection) {
				connection.connect(function (err) {
					if (err) throw err;
					logger.info(
						`My Sql database is connected successfully`
					);
					resolve(connection)
				});
			} else {
				resolve(connection);
			}

		} catch (err) {
			reject(err);
		}
	})
}