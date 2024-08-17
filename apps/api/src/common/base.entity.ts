import {
  BaseEntity as TOBaseEntity,
  BeforeInsert,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
} from 'typeorm';
import { v4 } from 'uuid';

export class BaseEntity extends TOBaseEntity {
  /**
   * The unique id of the entity.
   */
  @PrimaryGeneratedColumn()
  id: number;
}

export class BaseEntityWithUUID extends TOBaseEntity {
  @PrimaryColumn()
  id: string;

  @BeforeInsert()
  generatedUuid() {
    this.id = v4();
  }
}

export class BaseEntityWithTimestamp extends BaseEntityWithUUID {
  @Column()
  createdAt: Date;

  @Column({
    nullable: true,
  })
  updatedAt?: Date | null;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
