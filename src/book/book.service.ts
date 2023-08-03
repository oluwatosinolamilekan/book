import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { BookRepository } from './book.repository';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  private readonly books: Book[] = [
    {
      id: 1,
      title: 'Book 1',
      writer: 'Writer 1',
      coverImage: 'https://example.com/book1.jpg',
      point: 50,
      tags: ['fiction'],
    },
    {
      id: 2,
      title: 'Book 2',
      writer: 'Writer 2',
      coverImage: 'https://example.com/book2.jpg',
      point: 30,
      tags: ['non-fiction'],
    },
  ];

  async create(book: Book): Promise<Book> {
    return this.bookRepository.create(book);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  async findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne(id);
  }

  async delete(id: number): Promise<Book> {
    return this.bookRepository.delete(id);
  }

  async update(id: number, book: Book): Promise<Book> {
    return this.bookRepository.update(id, book);
  }

  getPurchasedBooks(userId: number): Book[] {
    const userPurchases = [
      { userId: 1, bookId: 1 },
      { userId: 1, bookId: 2 },
    ];

    const userPurchaseBooks = this.books.filter((book) =>
      userPurchases.some(
        (purchase) => purchase.userId === userId && purchase.bookId === book.id,
      ),
    );

    return userPurchaseBooks;
  }
}
