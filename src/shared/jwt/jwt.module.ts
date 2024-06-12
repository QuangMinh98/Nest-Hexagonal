import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { IJwtService } from './domain/port/IJwtService';
import { JwtService } from './infrastructure/driven/jwt.service';
import { JwtStrategy } from './infrastructure/strategies/JwtStrategy';

@Module({
  imports: [
    NestJwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwtKey'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: IJwtService,
      useClass: JwtService,
    },
    JwtStrategy,
  ],
  exports: [
    NestJwtModule,
    {
      provide: IJwtService,
      useClass: JwtService,
    },
  ],
})
export class JwtModule {}
