import { INestApplication } from '@nestjs/common';

export function corsConfig(app: INestApplication) {
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:57644',
      'http://localhost:4200',
      'https://housori.onrender.com',
    ],
    credentials: true,
  });
}
