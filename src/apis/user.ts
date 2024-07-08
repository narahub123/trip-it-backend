import { User } from "../db/user";

// 이메일을 통해서 유저 가져오기
export const getUserByEmail = (email: string) => User.findOne({ email });

// 닉네임을 통해서 유저 가져오기
export const getUserByNickname = (nickname: string) =>
  User.findOne({ nickname });

// 회원 가입
export const createUserByEmail = async (value: Record<string, any>) => {
  console.log(value);

  const user = new User(value);

  const savedUser = await user.save();

  return savedUser;
};
