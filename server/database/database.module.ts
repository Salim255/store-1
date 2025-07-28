import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_STRING'),
      }),
    }),
  ],
})
export class DatabaseModule {}
