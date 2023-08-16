import AuthRepository, { authRepository } from '../repository/auth/auth';
import { LoginRepRes, SignupRepRes } from '../repository/auth/type';

class AuthService {
  repo: AuthRepository;
  constructor(repo: AuthRepository) {
    this.repo = repo;
  }

  async signup(
    username: string,
    password: string,
  ): Promise<SignupRepRes | null> {
    try {
      const result = await this.repo.signup({ username, password });
      if ('error' in result) {
        if (result.response.status === 409) {
          alert('Email already exists');
          return null;
        }
        throw new Error(result.message);
      }
      return result;
    } catch (err) {
      alert(err);
      console.log(err);
      return null;
    }
  }

  async login(username: string, password: string): Promise<LoginRepRes | null> {
    try {
      const result = await this.repo.login({ username, password });
      if ('error' in result) {
        if (result.response.status === 400 || result.response.status === 401) {
          alert('Invalid email or password');
          return null;
        }
        throw new Error(result.message);
      }

      return result;
    } catch (err) {
      alert(err);
      console.log(err);
      return null;
    }
  }

  async logout(): Promise<boolean | null> {
    try {
      const result = await this.repo.logout();
      if (result && 'error' in result) {
        throw new Error(result.message);
      }
      return true;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const authService = new AuthService(authRepository);

export default authService;
