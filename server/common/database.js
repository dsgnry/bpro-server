import logger from "./loggerService.js";
import mysql from "mysql";

var connection = mysql.createConnection({
	host: 'admin.ccrd3phrsxrc.us-west-2.rds.amazonaws.com',
	user: 'mysqlserver',
	password: 'D#vils)WN',
	database: 'sid1'
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