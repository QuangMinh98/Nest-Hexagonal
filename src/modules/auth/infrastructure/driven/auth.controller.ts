import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { ILoginService } from '../../domain/ports/ILoginService';
import { IRegisterService } from '../../domain/ports/IRegisterService';
import { RegisterDto } from '../dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(ILoginService) private readonly loginService: ILoginService,
    @Inject(IRegisterService)
    private readonly registerService: IRegisterService,
  ) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.registerService.register(registerDto);
  }
}
