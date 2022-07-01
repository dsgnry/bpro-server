import { withConnection } from "./../../../common/database.js";

export class NotificationService {

  constructor() { }

  getNotifications() {
    return new Promise(async (resolve, reject) => {
      try {
        const connection = await withConnection();

        if (!connection) {
          return reject({ code: 501, message: "server connection error" });
        }

        let sql = `select * from notification`;

        connection.query(sql, (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        })

      } catch(err) {
        return reject(err);
      } 
    })
  }

  saveNotification(file, body) {
    return new Promise(async (resolve, reject) => {
      try {
        const connection = await withConnection();

        if (!connection) {
          return reject({ code: 501, message: "server connection error" });
        }

        const filePath = `${file.destination.replace("./", "")}/${file.filename}`
        const type = String(file.filename).match(/.\w+$/g)[0].replace(".", "")
        let sql = `insert into notification (title, image_source, type) values ('${body.title}', '${filePath}', '${type}')`;

        connection.query(sql, (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        })

      } catch(err) {
        return reject(err);
      }
    })
  }

}

export default new NotificationService();
