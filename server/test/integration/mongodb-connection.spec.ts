import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppModule } from '../../src/app.module';
import { getConnectionToken } from '@nestjs/mongoose';

describe('Mongodb database connection test (Integration Test)', () => {
  let connection: Connection;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    connection = module.get<Connection>(getConnectionToken());
  });

  it('it should connect to the database', () => {
    expect(connection.readyState).toEqual(1);
  });

  afterAll(async () => {
    if (connection) {
      await connection.close();
    }
  });
});
