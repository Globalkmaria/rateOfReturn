import AuthRepository, { authRepository } from '../repository/auth';

class AuthService {
  repo: AuthRepository;
  constructor(repo: AuthRepository) {
    this.repo = repo;
  }

  async signup(username: string, password: string) {
    try {
      const result = await this.repo.signup(username, password);
      if (result.error) {
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

  async login(username: string, password: string) {
    try {
      const result = await this.repo.login(username, password);
      if (result.error) {
        if (result.response.status === 400) {
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
}

const authService = new AuthService(authRepository);

export default authService;
