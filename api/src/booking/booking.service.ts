import { HttpException, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { VehicleEntity } from 'src/vehicle/vehicle.entity';
import { Brackets, Repository } from 'typeorm';
import { BookingEntity } from './booking.entity';
import { CreateBookingDto } from './dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  async create(bookingData: CreateBookingDto): Promise<BookingEntity> {
    const newBooking = plainToClass(BookingEntity, bookingData);

    const vehicle = await this.vehicleRepository.findAndCount({
      id: newBooking.vehicle,
    });

    if (vehicle[1] <= 0) {
      throw new HttpException('Given vehicle ID does not exist', 404);
    }

    const existingBookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.vehicleId = :vehicleId', {
        vehicleId: newBooking.vehicle,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where(':start >= booking.start', {
            start: new Date(newBooking.start),
          })
            .andWhere(':start <= booking.end', {
              start: new Date(newBooking.start),
            })
            .orWhere(':end >= booking.start', { end: new Date(newBooking.end) })
            .andWhere(':end <= booking.end', { end: new Date(newBooking.end) });
        }),
      )
      .getManyAndCount();

    if (existingBookings[1] > 0) {
      throw new HttpException(
        'Already registered booking in this timespan',
        409,
      );
    }

    return this.bookingRepository.save(newBooking);
  }

  async findAll() {
    return this.bookingRepository.findAndCount();
  }
}
