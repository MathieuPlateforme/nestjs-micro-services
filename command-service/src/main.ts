import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
            host: 'localhost',
            port: 3003,
        },
    });
    await app.listen();
    await app.startAllMicroservices();
    console.log('Microservice de commande écoute sur tcp://localhost:3003');
}

bootstrap();
