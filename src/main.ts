import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .setTitle('User authentication')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('user')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
    },
  });

  app.enableCors();
  app.useStaticAssets(resolve('./dist/public'));
  //app.setGlobalPrefix('/api')
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log('server on port', port);
}
bootstrap();
