import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Store-1 API')
    .setDescription('API for modern e-commerce')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.setGlobalPrefix((process.env.API_PREFIX ?? 'api') + '/v1'); // Set a global prefix for all routes

  // Setup Swagger UI at /api
  SwaggerModule.setup('api', app, document);
}
