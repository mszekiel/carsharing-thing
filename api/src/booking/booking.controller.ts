import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto';

@Controller('api/booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: 'Create new car booking' })
  @ApiResponse({
    status: 200,
    description: 'Booking has been created',
  })
  @ApiResponse({
    status: 409,
    description: 'Timeslot already taken',
  })
  @ApiResponse({
    status: 404,
    description: 'Vehicle ID does not exist',
  })
  @Post()
  create(@Body() bookingData: CreateBookingDto) {
    return this.bookingService.create(bookingData);
  }

  @Get()
  getAll() {
    return this.bookingService.findAll();
  }
}
