import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('BookController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/books (GET)', () => {
    it('should return an array of books', async () => {
      const response = await request(app.getHttpServer())
        .get('/books')
        .expect(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('/books/login (POST)', () => {
    it('should return a success message and points for valid login', async () => {
      const credentials = {
        email: 'admin@test.com',
        password: 'password',
      };
      const response = await request(app.getHttpServer())
        .post('/books/login')
        .send(credentials)
        .expect(200);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.points).toBe(100);
    });

    it('should return an error message for invalid login credentials', async () => {
      const credentials = {
        email: 'admin@test.com',
        password: 'password',
      };
      const response = await request(app.getHttpServer())
        .post('/books/login')
        .send(credentials)
        .expect(200);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });

  describe('/books/purchased/:userId (GET)', () => {
    it('should return an array of purchased books for a valid user', async () => {
      const userId = 1;
      const response = await request(app.getHttpServer())
        .get(`/books/purchased/${userId}`)
        .expect(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return an empty array for a user with no purchased books', async () => {
      const userId = 2;
      const response = await request(app.getHttpServer())
        .get(`/books/purchased/${userId}`)
        .expect(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });
  });
});
