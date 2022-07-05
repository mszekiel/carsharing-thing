import { IsISO8601, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsISO8601()
  readonly start: Date;

  @IsISO8601()
  readonly end: Date;

  @IsNumber()
  readonly vehicle: number;
}
