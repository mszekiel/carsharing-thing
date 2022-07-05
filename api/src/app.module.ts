import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';

import { BookingModule } from './booking/booking.module';
import configuration from './configuration';
import { VehicleModule } from './vehicle/vehicle.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../app/build'),
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    BookingModule,
    VehicleModule,
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class AppModule {}
