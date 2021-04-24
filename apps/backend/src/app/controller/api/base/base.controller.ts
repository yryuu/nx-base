/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import { Controller } from '@nestjs/common';

@Controller()
export class BaseController {
  constructor() {}
  protected getResponse() {
    return {
      resultCode: 200,
      body: {},
    };
  }
}
