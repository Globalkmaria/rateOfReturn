export type LoginResReq = {
  username: string;
  password: string;
};
export type LoginRepRes = { user: { username: string } };

export type SignupRepReq = LoginResReq;
export type SignupRepRes = LoginRepRes;
