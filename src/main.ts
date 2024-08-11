import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {ConfigService} from "@nestjs/config";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const port = configService.get('port')
  const swaggerConfig = new DocumentBuilder()
      .setTitle("NestJS API")
      .setDescription("Api for framework demo")
      .setVersion("1.0.0")
      .addTag("API")
      .build()
  const document = SwaggerModule.createDocument(app,swaggerConfig)
  app.use(cookieParser())
  SwaggerModule.setup("api",app,document)
  await app.listen(port);
}
bootstrap();
