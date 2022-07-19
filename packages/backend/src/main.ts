import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('APP');

  const config = new DocumentBuilder()
      .setTitle('Wallet APIs')
      .setDescription('APIs that were created by Wells Fargo to manage wallets')
      .setVersion('1.0')
      .setContact('SSAT Blockchain', 'wellsfargo.com', 'mabel.oza@wellsfargo.com')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);


  app.enableCors();

  const port = process.env.PORT || 3000;

  await app.listen(port, () => {
    logger.log(`⛱ server running on port ${port}`)
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
