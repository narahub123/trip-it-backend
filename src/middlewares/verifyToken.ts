import jwt from "jsonwebtoken";
import express from "express";
import { makeAccessToken } from "../helpers/index";

export const verifyAccessToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const excludedPaths = ["/login", "/join"]; // 제외할 경로들

  if (excludedPaths.includes(req.path)) {
    // login 또는 join 경로일 경우 미들웨어를 건너뜁니다.
    return next();
  }

  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  console.log("accessToken", accessToken);
  console.log("refreshToken", refreshToken);

  // access token이 없는 경우
  if (!accessToken || !refreshToken) {
    return res.status(403).json({ code: "logout", msg: "No Authorized" });
  }

  // access token 유효성 검사
  jwt.verify(accessToken, process.env.JWT_SECRET, (err: any, user: any) => {
    // 기간 만료의 경우
    if (err) {
      // refresh token 유효성 검사
      jwt.verify(
        refreshToken,
        process.env.JWT_SECRET,
        (err: any, user: any) => {
          // refresh token에 에러가 있는 경우
          if (err) {
            return res
              .status(403)
              .json({ code: "logout", msg: "Please log in again" });
          }

          // access token 재발급
          const accessExpiryDate = "15m";
          const newAccessToken = makeAccessToken(user, accessExpiryDate);

          res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            expires: new Date(Date.now() + 3600000),
          });

          req.user = user;
          next();
        }
      );
    } else {
      // access token이 유효한 경우
      req.user = user;

      console.log(user);

      next();
    }
  });
};
