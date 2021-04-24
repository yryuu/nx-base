import { Test, TestingModule } from '@nestjs/testing';
import { EasySignupController } from './easy-signup.controller';

describe('EasySignupController', () => {
  let controller: EasySignupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EasySignupController],
    }).compile();

    controller = module.get<EasySignupController>(EasySignupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
