import { Controller, Get, HttpException, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VehicleService } from './vehicle.service';

@ApiTags('api/vehicles')
@Controller('api/vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @ApiOperation({ summary: 'Update vehicles list from source' })
  @ApiResponse({
    status: 200,
    description: 'Vehicle update scheduled',
  })
  @ApiResponse({
    status: 400,
    description: 'Unable to schedule update',
  })
  @Get('update')
  async updateVehicles() {
    try {
      this.vehicleService.updateVehiclesList();
      return;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @Get()
  findAll(@Query() query) {
    return this.vehicleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.vehicleService.findOne(id);
  }
}
