import * as env from "./common/env.js"
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import http from "http";
import os from "os";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import logger from "./common/loggerService.js";
import api from "./api/router.js";

const app = express();
const whitelist = 'http://localhost:4200,'.split(',');

const corsOptions = {
  // origin: function (origin, callback) {
    // callback(null, true);
  //   if (!origin || whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  origin: '*',
  methods: "GET,PUT,POST,DELETE",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  allowedHeaders: "Content-Type, Authorization, Credentials",
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.normalize(__dirname + "/..");
app.use(express.json({ limit: "100kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "100kb",
  })
);
app.use(express.text({ limit: "100kb" }));
app.use(
  cookieParser("", {
    maxAge: 60 * 60 * 24 * 14 * 1000,
    httpOnly: true,
  })
);
app.use(express.static(`${root}/server/dist`));
app.use(cors(corsOptions));

app.use('/api', api);

const PORT = 9000;

const welcome = (p) => () =>
  logger.info(
    `up and running in ${ "development"
    } @: ${os.hostname()} on port: ${p}}`
  );

http.createServer(app).listen(PORT, welcome(PORT));
