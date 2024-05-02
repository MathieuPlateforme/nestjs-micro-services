"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleProviders = void 0;
const Role_entity_1 = require("../entities/Role.entity");
exports.roleProviders = [
    {
        provide: 'ROLE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(Role_entity_1.Role),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=Role.provider.js.map