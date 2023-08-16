import { config } from '../../config.js';
import HttpClient, { ErrorResponse } from '../../network/http.js';
import {
  LoginRepRes,
  LoginResReq,
  SignupRepReq,
  SignupRepRes,
} from './type.js';

class AuthRepository {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  async signup({
    username,
    password,
  }: SignupRepReq): Promise<SignupRepRes | ErrorResponse> {
    return this.http.fetch('/register', {
      method: 'POST',
      body: {
        username,
        password,
      },
    });
  }

  async login({
    username,
    password,
  }: LoginResReq): Promise<LoginRepRes | ErrorResponse> {
    return this.http.fetch('/login', {
      method: 'POST',
      body: {
        username,
        password,
      },
    });
  }

  async logout(): Promise<any | ErrorResponse> {
    return this.http.fetch('/logout', {
      method: 'GET',
    });
  }
}

const AuthBaseURL = `${config.server.url}/auth`;
export const httpClient = new HttpClient(AuthBaseURL);
export const authRepository = new AuthRepository(httpClient);

export default AuthRepository;
