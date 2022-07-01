import logger from "../../../common/loggerService.js";
import { manageError } from "../../../helper/response.helper.js";
import FilesService from "./files.service.js";
import { BaseController } from "../_base.controller.js";

export class Controller extends BaseController {

  async getFilesList(_, res) {
    try {
      const response = await FilesService.listFiles();
      super.response(res, response, 200, "");
    }
    catch (error) {
      const err = manageError(error);
      logger.error(`Error in login, err code: ${400}`);
      logger.error(err.message);
      super.response(res, '', err.code, err.message);
    }
  }

  async filterFilesList(req, res) {
    try {
      const { OEM } = req.query;
      console.log(OEM);
      const response = await FilesService.filterFiles(OEM);
      super.response(res, response, 200, "");
    }
    catch (error) {
      const err = manageError(error);
      logger.error(`Error in login, err code: ${400}`);
      logger.error(err.message);
      super.response(res, '', err.code, err.message);
    }
  }

  async uploadFile(req, res) {
    try {
      let response = await FilesService.uploadFile(req.file);
      super.response(res, response, 200, "Successfully Uploaded File");
    }
    catch (error) {
      const err = manageError(error);
      logger.error(`Error in login, err code: ${400}`);
      logger.error(err.message);
      super.response(res, '', err.code, err.message);
    }
  }

  async listlastFiles(_, res) {
    try {
      let response = await FilesService.listlastFiles();
      super.response(res, response, 200, "");
    }
    catch (error) {
      const err = manageError(error);
      logger.error(`Error in login, err code: ${400}`);
      logger.error(err.message);
      super.response(res, '', err.code, err.message);
    }
  }

}

export default new Controller();
