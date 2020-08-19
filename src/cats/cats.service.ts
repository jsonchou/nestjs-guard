/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  constructor() {
    this.cats = [{
      adoptionDate: new Date(),
      id: 1,
      breed: 'marshall',
      age: 11,
      name: 'json cat'
    }]
  }

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    return this.cats.find(item => item.id === id)
  }
}
