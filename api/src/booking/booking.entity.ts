import { VehicleEntity } from 'src/vehicle/vehicle.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('booking')
export class BookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.id, { cascade: true })
  vehicle: number;
}
