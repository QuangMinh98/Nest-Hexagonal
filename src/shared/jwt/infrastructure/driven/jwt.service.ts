import { JwtService as NestJwtService } from '@nestjs/jwt';
import { IJwtService } from '../../domain/port/IJwtService';
import { TSignOptions } from '../../domain/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService implements IJwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  sign(payload: object | Buffer, options?: TSignOptions): string {
    return this.nestJwtService.sign(payload, options);
  }
}
