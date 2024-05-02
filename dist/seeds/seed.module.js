"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedModule = void 0;
const common_1 = require("@nestjs/common");
const seed_services_1 = require("./seed.services");
const seed_controller_1 = require("./seed.controller");
const database_module_1 = require("../database/database.module");
const User_provider_1 = require("../providers/User.provider");
const Article_provider_1 = require("../providers/Article.provider");
const Role_provider_1 = require("../providers/Role.provider");
let SeedModule = class SeedModule {
};
exports.SeedModule = SeedModule;
exports.SeedModule = SeedModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [seed_controller_1.SeedController],
        providers: [seed_services_1.SeedServices, ...User_provider_1.userProviders, ...Article_provider_1.articleProviders, ...Role_provider_1.roleProviders],
        exports: [seed_services_1.SeedServices],
    })
], SeedModule);
//# sourceMappingURL=seed.module.js.map