import { Controller, Get } from '@nestjs/common';
import { UserService } from '@nx-base/backend-database/service/user.service';

@Controller('signin')
export class SigninController {
  constructor(private userService: UserService) {}

  @Get()
  async getData() {
    const user = await this.userService.findAll();
    return { test: user };
  }
}
