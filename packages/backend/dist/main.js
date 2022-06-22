"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Wallet APIs')
        .setDescription('APIs that were created by Wells Fargo to manage wallets')
        .setVersion('1.0')
        .addTag('crypto')
        .setContact('SSAT Blockchain', 'wellsfargo.com', 'mabel.oza@wellsfargo.com')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    app.enableCors();
    await app.listen(9000);
}
bootstrap();
//# sourceMappingURL=main.js.map