import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Shop } from '../entities/shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  create(createShopDto: CreateShopDto) {
    const shop = this.shopRepository.create(createShopDto);
    return this.shopRepository.save(shop);
  }

  findAll() {
    return this.shopRepository.find();
  }
}