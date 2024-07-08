export interface UserType {
  userId: string;
  email: string;
  username: string;
  nickname: string;
  password: string;
  birth: string;
  gender: string;
  role: string;
  regdate: Date;
  reportCount: number;
  userpic: string;
  userinfo?: string;
  endDate?: Date;
  socialType?: string;
}
