import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleController } from './vehicle.controller';

import { VehicleEntity } from './vehicle.entity';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity]), ConfigModule],
  providers: [VehicleService],
  controllers: [VehicleController],
})
export class VehicleModule {}
