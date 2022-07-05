import { SimpleVehicleDto } from './simple-vehicle.dto';

export class FindVehiclesDto {
  readonly vehicles: SimpleVehicleDto[];
  readonly count: number;
}
