import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Patch,
  Delete,
} from '@nestjs/common';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() book: Book): Promise<Book> {
    return this.bookService.create(book);
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() book: Book): Promise<Book> {
    return this.bookService.update(id, book);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.bookService.delete(id);
  }

  @Get('purchased/:userId')
  async getPurchasedBooks(@Param('userId') userId: number): Promise<Book[]> {
    return this.bookService.getPurchasedBooks(userId);
  }
}
