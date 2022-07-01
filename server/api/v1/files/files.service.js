import rimraf from "rimraf";
import { withConnection } from "./../../../common/database.js";
import XLSX from "xlsx";

export class FilesService {

  constructor() { }

  async listFiles(
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const connection = await withConnection();

        if (!connection) {
          return reject({ code: 501, message: "server connection error" });
        }

        connection.query('SELECT * FROM egypt', function (err, result, fields) {
          if (err) return reject(err);
          return resolve(result);
        });

      } catch (err) {
        return reject(err);
      }
    })
  }

  async filterFiles(
    filter
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const connection = await withConnection();

        if (!connection) {
          return reject({ code: 501, message: "server connection error" });
        }

        connection.query(`SELECT * FROM egypt where OEM='${filter}'`, function (err, result, fields) {
          if (err) return reject(err);
          return resolve(result);
        });

      } catch (err) {
        return reject(err);
      }
    })
  }

  async uploadFile(file) {
    return new Promise(async (resolve, reject) => {
      try {
        const connection = await withConnection();

        if (!connection) {
          return reject({ code: 501, message: "server connection error" });
        }

        let fileSql = `insert into last_excel_file (name, size, type) values ('${file.originalname}', '${file.size}', '${file.mimetype}')`;

        connection.query(fileSql, (err, result) => {
          if (err) return reject(err);
          console.log(result);
        })

        let workbook = XLSX.readFile(`uploads/${file.filename}`);
        let sheet_name_list = workbook.SheetNames;
        let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        rimraf('uploads/*', function () { });

        xlData.forEach((data) => {
          let sql = `insert into egypt (IPC, OEM, Model, Size, LISS, PATTERN, AXLE, MARKINGS, TECHNOLOGIES, SHARE) values ('${data.IPC}', '${data.OEM}', '${data.Model}', '${data.Size}', '${data.LISS}', '${data.PATTERN}', '${data.AXLE}', '${data.MARKINGS}', '${data.TECHNOLOGIES}', '${data.SHARE}')`;

          connection.query(sql, (err, result) => {
            if (err) return reject(err);
            console.log(result);
          })
        });

        return resolve({ code: 200, message: "Data inserted successfully" })
      } catch (err) {
        return reject(err);
      }
    })
  }

  async listlastFiles(
    ) {
      return new Promise(async (resolve, reject) => {
        try {
          const connection = await withConnection();
  
          if (!connection) {
            return reject({ code: 501, message: "server connection error" });
          }
  
          connection.query('SELECT * FROM last_excel_file', function (err, result) {
            if (err) return reject(err);
            return resolve(result);
          });
  
        } catch (err) {
          return reject(err);
        }
      })
    }

}

export default new FilesService();
