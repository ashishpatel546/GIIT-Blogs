import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // const configService = app.get<ConfigService>(ConfigService);
  // const port = configService.get('SERVICE_PORT');
  const port = process.env.SERVICE_PORT
  const config = new DocumentBuilder()
    .setTitle('GIIT Blogs')
    .setDescription('The blogs API description')
    .setVersion('1.0')
    .addTag('Blogs')
    .addBearerAuth(
      {
        description:
          'Please add the token in following format : Bearer: <jwt_token>',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-api', app, document); 
  await app.listen(port, async() => {    
    Logger.verbose(`\n\t\t\t\t\t\tService successfully started on PORT: ${port}`)
    Logger.debug(`\n\t\t\t SWAGGER-UI is accessible by a ctrl + click:\t ${await app.getUrl()}/swagger-api`)
  });
  
}
bootstrap();
