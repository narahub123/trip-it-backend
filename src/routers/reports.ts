import express from "express";

import {
  createReport,
  getAllReportsAdmin,
  getAllReportsById,
  getAllReportsForAdmin,
  updateReport,
} from "../controllers/reports";

export default (router: express.Router) => {
  router.post("/reports/add", createReport);
  router.get("/reports/list", getAllReportsById);
  router.get("/reports/admin", getAllReportsForAdmin);
  router.get("/reports/admin/test", getAllReportsAdmin);
  router.post("/reports/update", updateReport);
};
