import express from "express";
import {
  getPlacesByKeyAndId,
  getPlaceById,
  getPlaceByKeyword,
} from "../apis/tourAPI";
// import { ContentTypeId } from "data/areacode";
import { range } from "lodash";

export const getAllPlacesByKeywordNContentTypeId = async (
  req: express.Request,
  res: express.Response
) => {
  let { areaCode, contentTypeId, pageNo } = req.params;
  const origin = contentTypeId;

  contentTypeId === "1" ? (contentTypeId = "") : origin;

  const places = await getPlacesByKeyAndId(areaCode, contentTypeId, pageNo);

  return res.status(200).json(places);
};

export const getPlaceByContentId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let { contentId } = req.params;
    const place = await getPlaceById(contentId.toString());

    return res.status(200).json(place);
  } catch (error) {
    console.log(error);
  }
};

export const getPlaceByKeywordContentTypeIdAreaCode = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let { keyword, areaCode, contentTypeId, pageNo } = req.params;

    const origin = contentTypeId;

    contentTypeId === "1" ? (contentTypeId = "") : origin;

    const places = await getPlaceByKeyword(
      keyword,
      areaCode,
      contentTypeId,
      pageNo
    );

    return res.status(200).json(places);
  } catch (error) {
    console.log(error);
  }
};
