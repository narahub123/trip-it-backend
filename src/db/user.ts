import mongoose, { Schema, Types } from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    default: function () {
      return new Types.ObjectId();
    },
  },
  email: {
    type: String,
    required: [true, "이메일 형식에 맞는 주소를 입력해주세요"],
    trim: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
  },
  username: {
    type: String,
    required: [true, "이름은 한글로 2-5자로 작성해주세요"],
    trim: true,
    match: /^[가-힣]{2,5}$/,
  },
  nickname: {
    type: String,
    required: [
      true,
      "닉네임은 한글, 영어, 숫자 조합으로 2-20자 내외로 작성해주세요",
    ],
    unique: true,
    match: /^[a-zA-Z가-힣0-9_]{2,20}$/,
  },
  password: {
    type: String,
    required: true,
  },
  birth: { type: String, required: true, match: /^[0-9]{8}$/ },
  gender: { type: String, required: true, enum: ["m", "f"] },
  role: { type: String, default: "ROLE_USER" },
  regdate: { type: String, default: Date.now() },
  reportCount: { type: Number, default: 0 },
  userpic: { type: String, default: "" },
  userInfo: { type: String, required: false },
  endDate: { type: String, required: false },
  socialType: { type: String, required: false },
});

export const User = mongoose.model("User", UserSchema);
