import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from '../staff/entities/staff.entity';
import { SeederService } from './seeder.service';

@Module({
  providers: [SeederService],
  exports: [SeederService],
  imports: [TypeOrmModule.forFeature([Staff])],
})
export class SeederModule {}
