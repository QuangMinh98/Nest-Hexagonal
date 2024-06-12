import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { TRegisterPayload } from '../types';

export interface IRegisterService {
  register(payload: TRegisterPayload): Promise<UserEntity>;
}

export const IRegisterService = Symbol('IRegisterService');
