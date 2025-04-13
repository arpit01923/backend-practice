import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // Log MongoDB URI (without password for security)
    const mongoUri = configService.get<string>('MONGODB_URI');
    if (!mongoUri) {
      console.error('MONGODB_URI is not defined in environment variables');
      process.exit(1);
    }

    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB Host:', mongoUri.split('@')[1]?.split('/')[0]);

    await app.listen(process.env.PORT ?? 3000);
    console.log('Application is running on: http://localhost:' + (process.env.PORT ?? 3000));
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}
bootstrap();
