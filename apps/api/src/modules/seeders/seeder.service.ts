import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntityTypeEnum } from 'src/types/enums';
import { Repository } from 'typeorm';
import { Staff } from '../staff/entities/staff.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Staff)
    private readonly userRepository: Repository<Staff>,
  ) {}

  async seed() {
    await this.seedUsers();
  }

  async seedUsers() {
    const userCount = await this.userRepository.count();

    if (userCount === 0) {
      const users = this.userRepository.create([
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          username: 'super_admin',
          passwordHash: 'password',
          role: AuthEntityTypeEnum['SUPERADMIN'],
        },
      ]);
      await this.userRepository.save(users);
    }
  }
}
