import { Module } from '@nestjs/common';
import { UserService } from './domain/services/user.service';
import { UserController } from './infrastructure/driven/user.controller';
import { User, UserSchema } from './infrastructure/driving/entities/user';
import { MongooseModule } from '@nestjs/mongoose';
import { IUserRepository } from './domain/ports/IUserRepository';
import { UserRepository } from './infrastructure/driving/user.repository';
import { IUserService } from './domain/ports/IUserService';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IUserService,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IUserService,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
