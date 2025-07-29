import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // <-- initialize Swagger
  setupSwagger(app);

  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT, () => {
    console.log('Http Server running ✅ on port number: ', PORT);
  });
}

void bootstrap();
