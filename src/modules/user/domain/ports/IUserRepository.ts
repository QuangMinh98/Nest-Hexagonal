import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  countByEmail(email: string): Promise<number>;

  create(user: Omit<UserEntity, 'id'>): Promise<UserEntity>;

  getAll(): Promise<UserEntity[]>;

  getById(id: string): Promise<UserEntity>;

  getByEmail(email: string): Promise<UserEntity>;
}

export const IUserRepository = Symbol('IUserRepository');
