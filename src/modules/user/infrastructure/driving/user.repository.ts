import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserDocument, User } from './entities/user';
import { IUserRepository } from '../../domain/ports/IUserRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async countByEmail(email: string): Promise<number> {
    return this.model.countDocuments({ email });
  }

  async create(user: Omit<User, 'id'>): Promise<UserEntity> {
    const newUser = await this.model.create(user);
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    };
  }

  async getAll() {
    const users = await this.model.find();

    return users.map((user) => {
      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
      };
    });
  }

  async getById(id: string) {
    const user = await this.model.findById(id);

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  async getByEmail(email: string) {
    const user = await this.model.findOne({ email });

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}
