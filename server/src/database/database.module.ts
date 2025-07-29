import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('REMOTE_DATABASE_URL'),
        dbName: 'store-1',
      }),
    }),
  ],
})
export class DatabaseModule {}
