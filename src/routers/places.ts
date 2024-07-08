import express from "express";

import {
  getAllPlacesByKeywordNContentTypeId,
  getPlaceByContentId,
  getPlaceByKeywordContentTypeIdAreaCode,
} from "../controllers/places";

export default (router: express.Router) => {
  router.get(
    "/places/:areaCode/:contentTypeId/:pageNo",
    getAllPlacesByKeywordNContentTypeId
  );
  router.get("/places/:contentId", getPlaceByContentId);
  router.get(
    "/places/search/:areaCode/:contentTypeId/:keyword/:pageNo",
    getPlaceByKeywordContentTypeIdAreaCode
  );
};
