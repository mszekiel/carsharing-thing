import { BookingEntity } from 'src/booking/booking.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('vehicle')
export class VehicleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  externalId: number;

  @Column()
  name: string;

  @Column({ default: '' })
  shortDescription?: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  image: string;

  @OneToMany(() => BookingEntity, (booking) => booking.id)
  bookings: BookingEntity[];
}
