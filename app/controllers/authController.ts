import { Request, Response, NextFunction } from 'express';
import authServices from '../services/authServices';
import { DefaultResponse } from '../helpers/defaultResponseHelper';
import { IUserRegistration } from '../interfaces/IUserRegistration';
import { ok } from 'assert';

class AuthController {
  // User register
  async register(req: Request, res: Response, next: NextFunction) {
    try {      
      const { fullname, Email, Password, MobileNo }: IUserRegistration = req.body;
      // Call the service to handle user registration
      const result = await authServices.register(fullname, Email, Password, MobileNo.toString());   
      return ok(DefaultResponse(res, 201, result.message));
    } catch (error) {
      next(error);
    }
  }

  // User Login
  async login(req: Request, res: Response,next: NextFunction) {  
    try {
      const { email, password } = req.body;
      const token:any = await authServices.login(email, password);
      return ok(DefaultResponse(token, 201, "UUser has logged in successfully."))
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
