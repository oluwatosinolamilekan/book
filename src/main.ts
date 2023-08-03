import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('AMPQ_URL')],
      queue: 'bookstore_logs',
      queueOptions: { durable: true },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
