import {
  DeleteAccountRepRes,
  LoginRepRes,
  LoginResReq,
  MeRepRes,
  SignupRepReq,
  SignupRepRes,
} from './type.js';
import { config } from '../../config.js';
import HttpClient, { ErrorResponse } from '../../network/http';

class AuthRepository {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  async me(): Promise<MeRepRes | ErrorResponse> {
    return this.http.fetch('/me', {
      method: 'GET',
    });
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

  async logout(): Promise<undefined | ErrorResponse> {
    return this.http.fetch('/logout', {
      method: 'GET',
    });
  }

  async deleteAccount(): Promise<DeleteAccountRepRes | ErrorResponse> {
    return this.http.fetch('/account/complete', {
      method: 'DELETE',
    });
  }
}

const AuthBaseURL = `${config.server.url}/auth`;
export const httpClient = new HttpClient(AuthBaseURL);
export const authRepository = new AuthRepository(httpClient);

export default AuthRepository;
