import { Controller, Get, Query } from '@nestjs/common';
import { BaseController } from '@nx-base/backend-api-controller/base/base.controller';
import { UserService } from '@nx-base/backend-database/service/user.service';

@Controller('easy-signup')
export class EasySignupController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }
  @Get()
  async signup(@Query() query) {
    // バリテーションチェック
    if (query?.userId) {
      const user = await this.userService.findByUserId(query.userId);
      // ユーザが存在しない時は新規作成
      if (!user) {
        this.userService.saveEasyUser({
          id: null,
          userId: query.userId,
          pass: Math.random().toString(36).slice(-5),
          email: null,
          displayName: null,
        });
        return {
          ...this.getResponse(),
          responseCode: 200,
          body: {
            result: 1,
          },
        };
      } else {
        return {
          ...this.getResponse(),
          responseCode: 200,
          body: {
            result: 0,
          },
        };
      }
    } else {
      return { ...this.getResponse(), responseCode: 400 };
    }
  }
}
