import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from 'src/vehicle/vehicle.entity';
import { BookingController } from './booking.controller';

import { BookingEntity } from './booking.entity';
import { BookingService } from './booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity, VehicleEntity])],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
