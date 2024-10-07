// repositories/authRepository.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Initialize Prisma Client
const prisma = new PrismaClient();

class AuthRepository {
  // Find a user by email
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  // Create a new user
  async createUser(fullname: string, email: string, password: string, mobileNo: string) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    return prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        mobileNo,
      },
    });
  }
}

export default new AuthRepository();
