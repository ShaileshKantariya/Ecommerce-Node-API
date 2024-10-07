import authRepositories from '../repositories/authRepositories';
import { IUserRegistration } from '../interfaces/IUserRegistration';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

class AuthService {
  // Register a new user
  async register(fullname: string, email: string, password: string, mobileNo: string) {
    // Check if the user already exists
    const existingUser = await authRepositories.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create a new user
    const user = await authRepositories.createUser(fullname, email, password, mobileNo);

    return {
      message: 'User registration successful',
      user,
    };
  }

  async login(email: string, password: string): Promise<string> {
    const user = await authRepositories.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const token:any = jwt.sign({ id: user.id }, config.JwtSecret as string, {
      expiresIn: '1h',
    });

   return token;
  }
}

export default new AuthService();
