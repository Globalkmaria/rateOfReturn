import AuthRepository, { authRepository } from '../repository/auth/auth';
import { LoginRepRes, MeRepRes, SignupRepRes } from '../repository/auth/type';

class AuthService {
  repo: AuthRepository;
  constructor(repo: AuthRepository) {
    this.repo = repo;
  }

  async me(): Promise<MeRepRes | null> {
    try {
      const result = await this.repo.me();
      if ('user' in result) {
        return result.user ? result : null;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
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

  async deleteAccount(): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      const result = await this.repo.deleteAccount();
      if (result && 'error' in result) {
        if (result.response.status === 403) {
          return {
            success: false,
            message: 'Unauthorized to delete account. Please contact support.',
          };
        }

        throw new Error(result.message);
      }
      return {
        success: true,
        message: 'Account deleted successfully',
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: 'Failed to delete account. Please try again later.',
      };
    }
  }
}

const authService = new AuthService(authRepository);

export default authService;
