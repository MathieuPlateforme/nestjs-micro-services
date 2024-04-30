"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedServices = void 0;
const faker_1 = require("@faker-js/faker");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let SeedServices = class SeedServices {
    constructor(userRepository, articleRepository, roleRepository) {
        this.userRepository = userRepository;
        this.articleRepository = articleRepository;
        this.roleRepository = roleRepository;
    }
    async createRandomUsers() {
        for (let i = 0; i < 100; i++) {
            const newUser = this.userRepository.create({
                birthday: faker_1.faker.date.past(),
                email: faker_1.faker.internet.email(),
                firstName: faker_1.faker.name.firstName(),
                lastName: faker_1.faker.name.lastName(),
                password: faker_1.faker.internet.password(),
                sex: faker_1.faker.person.sexType(),
                picture: faker_1.faker.image.imageUrl(),
                isActive: faker_1.faker.datatype.boolean(),
                role: faker_1.faker.datatype.number({ min: 0, max: 4 }),
            });
            await this.userRepository.save(newUser);
        }
        console.log('Seed completed!');
    }
    async createRandomArticles() {
        for (let i = 0; i < 100; i++) {
            const newUser = this.articleRepository.create({});
            await this.userRepository.save(newUser);
        }
        console.log('Seed completed!');
    }
    async createRoles() {
        for (let i = 0; i < 100; i++) {
            const newUser = this.roleRepository.create({});
            await this.userRepository.save(newUser);
        }
    }
};
exports.SeedServices = SeedServices;
exports.SeedServices = SeedServices = __decorate([
    __param(0, (0, common_1.Inject)('USER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], SeedServices);
//# sourceMappingURL=seed.services.js.map