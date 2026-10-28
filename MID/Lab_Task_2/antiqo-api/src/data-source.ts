
import 'dotenv/config';
import { DataSource } from 'typeorm';

import { Shop } from './entities/shop.entity';
import { Product } from './entities/product.entity';
import { Review } from './entities/review.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),

  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  entities: [
    Shop,
    Product,
    Review,
  ],

  migrations: [
    'src/migrations/*.ts',
  ],

  synchronize: false,
});
