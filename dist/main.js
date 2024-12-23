"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const contants_util_1 = require("./shared/utils/contants.util");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const place_constants_1 = require("./modules/places/utils/place.constants");
const aws_sdk_1 = require("aws-sdk");
async function bootstrap() {
    const configService = new config_1.ConfigService;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();
    const GW_PORT = configService.get(contants_util_1.CONSTANTS_UTIL.GW_PORT);
    try {
        await mongoose_1.default.connect(`${process.env.DB_CNN}/${process.env.DB_NAME}`);
        common_1.Logger.log('Database connection successful', 'AppModule');
    }
    catch (error) {
        common_1.Logger.error(`Failed to connect to the database: ${error}`, '', 'DatabaseConnectionError');
    }
    await app.listen(3000, '0.0.0.0');
    aws_sdk_1.config.update({
        accessKeyId: configService.get(place_constants_1.PLACE_CONSTANTS.AWS_ACCESS_KEY_ID),
        secretAccessKey: configService.get(place_constants_1.PLACE_CONSTANTS.AWS_SECRET_ACCESS_KEY),
        region: configService.get(place_constants_1.PLACE_CONSTANTS.AWS_REGION),
    });
    common_1.Logger.log('PORT', 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map