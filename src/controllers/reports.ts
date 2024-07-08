import express from "express";
import {
  createReportByValue,
  getAllReports,
  getReportsById,
  updateReportById,
  getAdminAllReports,
} from "../apis/reports";
import { ReportModel } from "../db/reports";
import { ReportType } from "types/reports";

// 신고 등록하기
export const createReport = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const value = req.body;

    // console.log(value);

    if (!value) {
      return res.sendStatus(403);
    }

    // 중복 검사 필요함

    const report = await createReportByValue(value);

    // console.log(report);

    return res.status(201).json(report);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const getAllReportsById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId } = req.query;

    console.log(userId);

    if (!userId) {
      return res.sendStatus(403);
    }

    const reports = await getReportsById(Number(userId));

    return res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getAllReportsForAdmin = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let result = getAllReports();

    const reports = await result;

    return res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

interface QueryObject {
  [key: string]: any;
}

export const getAllReportsAdmin = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { sortKey, sortValue, keyword, search } = req.query;

    const queryObject: QueryObject = {};

    console.log("search", search);

    if (search) {
      if (keyword === "userId" && !isNaN(Number(search))) {
        queryObject[keyword as keyof ReportType] = Number(search);
      } else if (keyword == "reportedUserId" && !isNaN(Number(search))) {
        queryObject[keyword as keyof ReportType] = Number(search);
      } else if (keyword !== "userId") {
        queryObject[keyword as keyof ReportType] = {
          $regex: search,
          $options: "i",
        };
      }
    }

    let result = getAdminAllReports(queryObject);

    // sort
    if (sortValue === "desc") {
      result = result.sort("-" + sortKey);
    } else {
      result = result.sort(sortKey.toString());
    }

    const totalPages = await ReportModel.countDocuments(queryObject);

    // pagination
    const limit = Number(req.query.limit) || 5;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const reports = await result.skip(skip).limit(limit);

    return res.status(200).json({ reports, totalPages });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateReport = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { reportId, reportFalse } = req.body;

    const response = await updateReportById(reportId, reportFalse);

    console.log(response);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
