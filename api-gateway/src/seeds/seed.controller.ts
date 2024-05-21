import { Controller, Get } from '@nestjs/common';
import { SeedServices } from './seed.services';

@Controller("/seed")
export class SeedController {
  constructor(private readonly seedServices: SeedServices) {}

  @Get("/user")
  createUser() {
    return this.seedServices.createRandomUsers();
  }
}
