type UserInfo = { user: { username: string } };

export type MeRepRes = UserInfo;

export type LoginResReq = {
  username: string;
  password: string;
};
export type LoginRepRes = UserInfo;

export type SignupRepReq = LoginResReq;
export type SignupRepRes = LoginRepRes;
