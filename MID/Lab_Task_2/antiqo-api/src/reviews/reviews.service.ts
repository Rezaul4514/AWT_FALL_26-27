
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Review } from '../entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  create(createReviewDto: CreateReviewDto) {
    const review = this.reviewRepository.create({
      ...createReviewDto,
      product: { id: createReviewDto.productId },
    });

    return this.reviewRepository.save(review);
  }

  findAll() {
    return this.reviewRepository.find({
      relations: {
        product: true,
      },
    });
  }
}
