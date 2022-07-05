import { BookingEntity } from 'src/booking/booking.entity';
import { VehicleService } from 'src/vehicle/vehicle.service';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    entities: [VehicleService, BookingEntity],
    autoLoadEntities: true,
    migrate: true,
    synchronize: true,
  },
  api: {
    vehicles: {
      main: process.env.API_VEHICLES,
      details: process.env.API_VEHICLES_DETAIL,
    },
  },
});
