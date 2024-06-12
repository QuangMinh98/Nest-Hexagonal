import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      dbConnectionString: process.env.DB_CONNECTION_STRING,
      jwtKey: process.env.JWT_KEY,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
