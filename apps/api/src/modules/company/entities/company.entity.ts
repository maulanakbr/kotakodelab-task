import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { BaseEntityWithTimestamp } from '../../../common/base.entity';
import { Staff } from 'src/modules/staff/entities/staff.entity';

@Entity()
export class Company extends BaseEntityWithTimestamp {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string | null;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column({
    unique: true,
  })
  latitude: string;

  @Column({
    unique: true,
  })
  longitude: string;

  @OneToMany(() => Staff, (staff) => staff.company, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  staffs?: Relation<Staff[] | null>;
}
