import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserService } from '../../domain/ports/IUserService';
import { JwtAuthGuard } from 'src/shared/jwt/infrastructure/guards/JwtAuthGuard';
import { User } from 'src/common/decorators/UserDecorator';

@Controller('user')
export class UserController {
  constructor(
    @Inject(IUserService) private readonly userService: IUserService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@User() user: ReqUser) {
    return this.userService.findOne(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
