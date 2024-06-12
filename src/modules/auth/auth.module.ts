import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/driven/auth.controller';
import { UserModule } from '../user/user.module';
import { LoginService } from './domain/services/login.service';
import { ILoginService } from './domain/ports/ILoginService';
import { JwtModule } from 'src/shared/jwt/jwt.module';
import { IRegisterService } from './domain/ports/IRegisterService';
import { RegisterService } from './domain/services/register.service';

@Module({
  imports: [JwtModule, UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: ILoginService,
      useClass: LoginService,
    },
    {
      provide: IRegisterService,
      useClass: RegisterService,
    },
  ],
})
export class AuthModule {}
