import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book } from './book.entity';

@Injectable()
export class BookRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(book: Book): Promise<Book> {
    return this.prisma.book.create({ data: book });
  }

  async findAll(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  async findOne(id: number): Promise<Book> {
    return this.prisma.book.findUnique({ where: { id } });
  }

  async delete(id: number): Promise<Book> {
    return this.prisma.book.delete({ where: { id } });
  }

  async update(id: number, book: Book): Promise<Book> {
    return this.prisma.book.update({
      where: { id },
      data: { ...book },
    });
  }
}
