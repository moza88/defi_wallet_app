import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('Wallet APIs')
      .setDescription('APIs that were created by Wells Fargo to manage wallets')
      .setVersion('1.0')
      .addTag('crypto')
      .setContact('SSAT Blockchain', 'wellsfargo.com', 'mabel.oza@wellsfargo.com')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);


  app.enableCors();

  await app.listen(9000);
}
bootstrap();
