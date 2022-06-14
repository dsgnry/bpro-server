import logger from "../../../common/loggerService.js";
import { manageError } from "../../../helper/response.helper.js";
import NotificationService from "./notification.service.js";
import { BaseController } from "../_base.controller.js";

export class Controller extends BaseController {

  async getNotifications(_, res) {
    try {
      const response = await NotificationService.getNotifications();
      super.response(res, response, 200, "");
    }
    catch (error) {
      const err = manageError(error);
      logger.error(`Error in login, err code: ${400}`);
      logger.error(err.message);
      super.response(res, '', err.code, err.message);
    }
  }
  async saveNotification(req, res) {
    try {
      const response = await NotificationService.saveNotification(req.file, req.body);
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
