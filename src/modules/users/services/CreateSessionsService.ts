import { AppError } from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { User } from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UsersRepository";

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combinantion.", 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError("Incorrect email/password combinantion.", 401);
    }

    await usersRepository.save(user);

    return user;
  }
}

export { CreateSessionsService };
