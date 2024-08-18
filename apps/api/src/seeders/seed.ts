import { NestFactory } from '@nestjs/core';
import { SeederModule } from 'src/modules/seeders/seeder.module';
import { SeederService } from 'src/modules/seeders/seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const seeder = app.get(SeederService);

  try {
    console.log('Starting seeding...');
    await seeder.seed();
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
