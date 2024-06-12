import { TSignOptions } from '../types';

export interface IJwtService {
  sign(payload: object | Buffer, options?: TSignOptions): string;
}

export const IJwtService = Symbol('IJwtService');
