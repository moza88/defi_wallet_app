"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./controller/app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const app_service_2 = require("./services/bitgo/app.service");
const app_controller_2 = require("./controller/bitgo/app.controller");
const app_controller_3 = require("./controller/fireblocks/app.controller");
const app_service_3 = require("./services/fireblocks/app.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot(), axios_1.HttpModule],
        controllers: [app_controller_1.AppController, app_controller_2.BitgoController, app_controller_3.FireblocksController],
        providers: [app_service_1.AppService, app_service_2.BitgoService, app_service_3.FireblocksService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map