import { Injectable } from '@nestjs/common';
import { CompanyDto } from './dto/company.dto';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyAlreadyExistsError } from 'src/errors/ResourceError';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(options: CompanyDto): Promise<Company> {
    const existingCompany = await this.findOne(undefined, options.name);
    if (existingCompany) CompanyAlreadyExistsError();

    const company = new Company();
    company.name = options.name;
    company.description = options.description;
    company.address = options.address;
    company.city = options.city;
    company.latitude = options.latitude;
    company.longitude = options.longitude;

    return await company.save();
  }

  async findOne(id?: string, name?: string): Promise<Company | null> {
    if (id) {
      return await this.companyRepository.findOne({
        where: { id },
        relations: ['staffs'],
      });
    }

    if (name) {
      return await this.companyRepository.findOne({ where: { name } });
    }
  }

  async findAll(): Promise<Company[] | null> {
    return await this.companyRepository.find({ relations: ['staffs'] });
  }
}
