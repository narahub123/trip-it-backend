import express from "express";

import authenticaction from "./authentication";
import auth from "./auth";
import schedule from "./schedules";
import places from "./places";
import reports from "./reports";
import user from "./user";

const router = express.Router();

export default (): express.Router => {
  authenticaction(router);
  auth(router);
  schedule(router);
  places(router);
  reports(router);
  user(router);

  return router;
};
