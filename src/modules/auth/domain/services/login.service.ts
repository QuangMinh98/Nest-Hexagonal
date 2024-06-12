import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { comparePassword, hashPassword } from 'src/utils';
import { TLoginPayload, TRegisterPayload } from '../types';
import { ILoginService } from '../ports/ILoginService';
import { IUserRepository } from 'src/modules/user/domain/ports/IUserRepository';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { IJwtService } from 'src/shared/jwt/domain/port/IJwtService';

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(IJwtService) private readonly jwtService: IJwtService,
  ) {}

  async login({ email, password }: TLoginPayload) {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new BadRequestException({
        code: 400,
        message: 'Invalid email or password',
      });
    }

    const isValid = comparePassword(user.password, password);
    if (!isValid) {
      throw new BadRequestException({
        code: 400,
        message: 'Invalid email or password',
      });
    }

    return this._generateToken(user);
  }

  private _generateToken(user: UserEntity) {
    const expiresIn = '30d';

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn });

    return {
      accessToken,
    };
  }

  async register(payload: TRegisterPayload) {
    const hashedPassword = hashPassword(payload.password);
    return this.userRepository.create({
      ...payload,
      password: hashedPassword,
    });
  }
}
