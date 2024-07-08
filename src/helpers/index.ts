// encrypt the password or create a random token
import crypto from "crypto";
import jwt from "jsonwebtoken";

const SECRET = "TRIP-IT-REST-API";

// 랜덤 번호 생성
export const random = () => crypto.randomBytes(128).toString("base64");

// 패스워드 해싱하기
export const hashedPassword = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

export const makeAccessToken = (validUser: any, expiresIn: string) => {
  const accessToken = jwt.sign(
    {
      userId: validUser.userId,
      email: validUser.email,
      role: validUser.role,
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );

  return accessToken;
};

export const makeRefreshToken = (validUser: any, expiresIn: string) => {
  const refreshToken = jwt.sign(
    {
      userId: validUser.userId,
      email: validUser.email,
      role: validUser.role,
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );

  return refreshToken;
};
