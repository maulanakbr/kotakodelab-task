import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityWithTimestamp } from '../../../common/base.entity';
import { timeSubstraction } from 'src/helpers/time-substraction';
import { Staff } from 'src/modules/staff/entities/staff.entity';

@Entity()
export class Attendance extends BaseEntityWithTimestamp {
  @Column()
  staffId: string;

  @Column()
  clockIn: string;

  @Column({
    nullable: true,
  })
  clockOut?: string | null;

  @Column({
    nullable: true,
  })
  duration?: number | null;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  createdAt: string;

  @Column({
    nullable: true,
  })
  updatedAt?: string | null;

  @ManyToOne(() => Staff, (staff) => staff.attendances, { cascade: true })
  @JoinColumn({ name: 'staff_id', referencedColumnName: 'id' })
  staff: Staff;

  @BeforeUpdate()
  calculateDuration() {
    if (this.clockOut) {
      this.duration = timeSubstraction(this.clockIn, this.clockOut);
    }
  }
}
