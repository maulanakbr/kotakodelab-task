import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntityWithTimestamp } from '../../../common/base.entity';
import { hashPassword } from '../../../helpers/password.helpers';
import { Exclude } from 'class-transformer';
import { Company } from 'src/modules/company/entities/company.entity';
import { AuthEntityTypeEnum } from 'src/types/enums';
import { Attendance } from 'src/modules/attendance/entities/attendance.entity';

export interface IStaff {
  id: string;
  staffId: string;
  firstName: string;
  lastName: string;
  email: string;
  companyId: string;
  passwordHash: string;
  accessToken: string;
  username: string;
}

@Entity()
export class Staff extends BaseEntityWithTimestamp {
  @Column({
    nullable: true,
  })
  companyId?: string | null;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: AuthEntityTypeEnum,
    nullable: true,
    default: AuthEntityTypeEnum['STAFF'],
  })
  role?: AuthEntityTypeEnum;

  @Exclude()
  @Column()
  passwordHash: string;

  @Exclude()
  @Column({ nullable: true })
  accessToken: string;

  @Column({ unique: true })
  username: string;

  @OneToMany(() => Attendance, (attendance) => attendance.staff)
  @JoinColumn({ name: 'attendances' })
  attendances: Attendance[];

  @ManyToOne(() => Company, (company) => company.staffs)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @BeforeInsert()
  async hashUserPassword() {
    if (this.passwordHash) {
      this.passwordHash = await hashPassword(this.passwordHash);
    }
  }
}
