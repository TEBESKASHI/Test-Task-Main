import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { EventEntity } from './src/event/event.entity';
import { $npmConfigName1674479636201 } from './migrations/1674479636201-$npm_config_name';
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [EventEntity],
  migrations: [$npmConfigName1674479636201],
});
