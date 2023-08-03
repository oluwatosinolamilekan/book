// src/bookstore/book/book.entity.ts

import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsArray,
} from 'class-validator';

export class Book {
  id?: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  writer: string;

  @IsNotEmpty()
  @IsString()
  coverImage: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  point: number;

  @IsNotEmpty()
  @IsArray()
  tags: string[];
}
