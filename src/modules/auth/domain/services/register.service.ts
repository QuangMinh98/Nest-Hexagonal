import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TRegisterPayload } from '../types';
import { hashPassword } from 'src/utils';
import { IUserRepository } from 'src/modules/user/domain/ports/IUserRepository';
import { IRegisterService } from '../ports/IRegisterService';

@Injectable()
export class RegisterService implements IRegisterService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async register(payload: TRegisterPayload) {
    const countEmail = await this.userRepository.countByEmail(payload.email);

    // Check if the email is already registered.
    if (countEmail) {
      throw new BadRequestException({
        code: 400,
        message: 'Email is already registered',
      });
    }

    // Hash the password before saving it to the database.
    const hashedPassword = hashPassword(payload.password);

    return this.userRepository.create({
      ...payload,
      password: hashedPassword,
    });
  }
}
