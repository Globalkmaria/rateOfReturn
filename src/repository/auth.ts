import { config } from '../config.js';
import HttpClient from '../network/http';

class AuthRepository {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  async signup(username: string, password: string) {
    return this.http.fetch('/register', {
      method: 'POST',
      body: {
        username,
        password,
      },
    });
  }

  async login(username: string, password: string) {
    return this.http.fetch('/login', {
      method: 'POST',
      body: {
        username,
        password,
      },
    });
  }
}

const AuthBaseURL = `${config.server.url}/auth`;
export const httpClient = new HttpClient(AuthBaseURL);
export const authRepository = new AuthRepository(httpClient);

export default AuthRepository;
