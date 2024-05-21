import { User } from '../entities/User.entity';
import { Article } from "../entities/Article.entity";
import { Role } from '../entities/Role.entity';

import { faker } from '@faker-js/faker';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class SeedServices {

  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('ARTICLE_REPOSITORY')
    private readonly articleRepository: Repository<Article>,
    @Inject('ROLE_REPOSITORY')
    private readonly roleRepository: Repository<Role>

  ) {}
  
  async createRandomUsers() {
    for (let i = 0; i < 100; i++) {
      const newUser = this.userRepository.create({
        birthday: faker.date.past(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: faker.internet.password(),
        sex: faker.person.sexType(),
        picture: faker.image.imageUrl(),
        isActive: faker.datatype.boolean(),
        role: faker.datatype.number({ min: 0, max: 4 }),
      });
      await this.userRepository.save(newUser);
    }
    console.log('Seed completed!');
  }
  
  async createRandomArticles() {
    for (let i = 0; i < 100; i++) {
      const newUser = this.articleRepository.create({
        // title
        // description
        // content
        // image
        // user_author
        // category
      });
      await this.userRepository.save(newUser);
    }
    console.log('Seed completed!');
  }

  async createRoles(){
    for (let i = 0; i < 100; i++) {
      const newUser = this.roleRepository.create({
      
      });
      await this.userRepository.save(newUser);
  }

}


}