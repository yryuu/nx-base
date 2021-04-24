import { Module } from '@nestjs/common';
import { SigninController } from '@nx-base/backend-api-controller/user/signin/signin.controller';
import { UserDbModule } from '@nx-base/backend-database/module/userDb.module';
import { SignupController } from './signup/signup.controller';
import { EasySignupController } from './easy-signup/easy-signup.controller';
@Module({
  imports: [UserDbModule],
  controllers: [SigninController, SignupController, EasySignupController],
})
export class UserModule {}
