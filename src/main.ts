import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./common/exceptions.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv !== 'production' && nodeEnv !== 'prod') {
    const config = new DocumentBuilder()
      .setTitle('Transfeera API')
      .setDescription('Documentação da API da Transfeera')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
