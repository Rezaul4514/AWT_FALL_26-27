import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { EmployeesModule } from './employees/employees.module';
import { Product } from './products/product.entity';
import { Employee } from './employees/employee.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'better-sqlite3',
        database: config.get<string>('DB_DATABASE') || './shop.sqlite',
        entities: [Product, Employee],
        synchronize: true,
      }),
    }),
    ProductsModule,
    EmployeesModule,
  ],
})
export class AppModule {}
