import express from "express";
import {
  createUserByEmail,
  getUserByEmail,
  getUserByNickname,
} from "../apis/user";
import bcryptjs from "bcryptjs";

import { makeAccessToken, makeRefreshToken } from "../helpers/index";

// 로그인
export const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  console.log(email, password);
  try {
    // 이메일 검사
    const validUser = await getUserByEmail(email);
    if (!validUser)
      return res.status(404).json({ code: 1, msg: "User not found" });

    // 패스워드 검사
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return res.status(401).json({ code: 2, msg: "wrong password" });

    // access token 생성
    const accessExpiryDate = "10m";
    const accessToken = makeAccessToken(validUser, accessExpiryDate);

    console.log(accessToken);

    // refresh token 생성
    const refreshExpiryDate = "1h";
    const refreshToken = makeRefreshToken(validUser, refreshExpiryDate);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000),
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000),
    });
    res.status(200).json({ code: 1, msg: "logged in successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 1, msg: "Internal Error" });
  }
};

// 회원 가입
export const join = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username, nickname, gender, birth } = req.body;

    // 정보를 전부 전달 받았는지 여부 확인
    if (!email || !password || !username || !nickname || !gender || !birth) {
      return res.status(400).json({ code: 3, msg: "Missing required fields" });
    }

    let existingUser = await getUserByEmail(email);

    // 동일 이메일 등록 여부 확인
    if (existingUser) {
      return res.status(400).json({
        code: 1,
        msg: "email is already existed",
      });
    }

    existingUser = await getUserByNickname(nickname);

    // 동일 닉네임 등록 여부 확인
    if (existingUser) {
      return res.status(400).json({
        code: 2,
        msg: "nickname is already existed",
      });
    }

    // 패스워드 해싱하기
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const user = await createUserByEmail({
      email,
      password: hashedPassword,
      username,
      nickname,
      gender,
      birth,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 1,
      msg: "Internal Error",
    });
  }
};
