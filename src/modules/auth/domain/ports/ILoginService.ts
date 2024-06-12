import { TLoginPayload } from '../types';

export interface ILoginService {
  login(payload: TLoginPayload): Promise<{ accessToken: string }>;
}

export const ILoginService = Symbol('ILoginService');
