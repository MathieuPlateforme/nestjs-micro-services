import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Remplacez par l'origine de votre application Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Autorise l'envoi de cookies et d'authentification HTTP
  });

  await app.listen(8080);
}
bootstrap();
