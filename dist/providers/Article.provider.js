"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleProviders = void 0;
const Article_entity_1 = require("../entities/Article.entity");
exports.articleProviders = [
    {
        provide: 'ARTICLE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(Article_entity_1.Article),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=Article.provider.js.map