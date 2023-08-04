import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { BookRepository } from './book.repository';

describe('BookService', () => {
  let bookService: BookService;

  let bookRepo: BookRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, BookService, ConfigService, BookRepository],
    }).compile();

    bookService = app.get<BookService>(BookService);
    bookRepo = app.get<BookRepository>(BookRepository);
  });

  describe('create books', () => {
    it('should create a book', async () => {
      const data = {
        id: 1,
        title: 'Book 1',
        writer: 'Author 1',
        coverImage: 'https://example.com/book1.jpg',
        point: 50,
        tags: ['fiction', 'adventure'],
      };

      jest.spyOn(bookRepo, 'create').mockResolvedValue(data);

      const response = await bookService.create(data);
      expect(response).toEqual(data);
      expect(bookRepo.create).toHaveBeenNthCalledWith(1, data);
    });
  });

  describe('get books', () => {
    it('should return an array of books', async () => {
      const data = [
        {
          title: 'Book 1',
          writer: 'Author 1',
          coverImage: 'https://example.com/book1.jpg',
          point: 50,
          tags: ['fiction', 'adventure'],
        },
      ];

      jest.spyOn(bookRepo, 'findAll').mockResolvedValue(data);

      const response = await bookService.findAll();
      expect(response).toEqual(data);
      expect(bookRepo.findAll).toHaveBeenCalledTimes(1);
    });

    describe('get book', () => {
      it('should return an sintle objecy of books', async () => {
        const bookId = 1;
        const data = {
          id: 1,
          title: 'Book 1',
          writer: 'Writer 1',
          coverImage: 'https://example.com/book1.jpg',
          point: 50,
          tags: ['fiction'],
        };

        jest.spyOn(bookRepo, 'findOne').mockResolvedValue(data);

        const response = await bookService.findOne(bookId);
        expect(response).toEqual(data);
        expect(bookRepo.findOne).toHaveBeenNthCalledWith(1, bookId);
      });
    });
  });

  describe('delete book', () => {
    it('should return an sintle objecy of books', async () => {
      const bookId = 1;
      const data = {
        id: 1,
        title: 'Book 1',
        writer: 'Writer 1',
        coverImage: 'https://example.com/book1.jpg',
        point: 50,
        tags: ['fiction'],
      };

      jest.spyOn(bookRepo, 'delete').mockResolvedValue(data);

      const response = await bookService.delete(bookId);
      expect(response).toEqual(data);
      expect(bookRepo.delete).toHaveBeenNthCalledWith(1, bookId);
    });
  });

  describe('update book', () => {
    it('should return an updated book data', async () => {
      const bookId = 1;
      const data = {
        id: 1,
        title: 'Book 4',
        writer: 'Writer 1',
        coverImage: 'https://example.com/book1.jpg',
        point: 50,
        tags: ['fiction'],
      };

      jest.spyOn(bookRepo, 'update').mockResolvedValue(data);

      const response = await bookService.update(bookId, data);
      expect(response).toEqual(data);
      expect(bookRepo.update).toHaveBeenNthCalledWith(1, bookId, data);
    });
  });

  describe('get purchases books', () => {
    it('should return an array of books purchase', async () => {
      const userId = 1;

      const response = await bookService.getPurchasedBooks(userId);
      expect(response).toEqual(bookService.books);
    });
  });
});
