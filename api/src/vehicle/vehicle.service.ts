import axios from 'axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import {
  classToClass,
  plainToClass,
  plainToClassFromExist,
} from 'class-transformer';
import { Repository } from 'typeorm';

import { VehicleEntity } from './vehicle.entity';
import {
  CreateVehicleDto,
  FindVehiclesDto,
  SimpleVehicleDto,
  DetailsVehicleDto,
} from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
    private configService: ConfigService,
  ) {}

  private onModuleInit() {
    this.updateVehiclesList();
  }

  @Cron('*/30 * * * *')
  async updateVehiclesList() {
    const externalVehicles = await axios
      .get<VehicleEntity[]>(this.configService.get('api.vehicles.main'))
      .then((res) => res.data)
      .then((data) =>
        Promise.all(data.map((i) => this.getExternalDetails(i.id))),
      );

    await this.create(externalVehicles);
  }

  async getExternalDetails(id: number) {
    return axios(
      this.configService
        .get('api.vehicles.details')
        .replace('{id}', id.toString()),
    ).then((res) => res.data);
  }

  async create(vehicles: CreateVehicleDto[]): Promise<VehicleEntity[]> {
    const entities: VehicleEntity[] = vehicles.map((i) =>
      plainToClass(
        VehicleEntity,
        { ...i, externalId: i.id },
        { excludePrefixes: ['id'] },
      ),
    );

    const newVehicles = await this.vehicleRepository
      .createQueryBuilder()
      .insert()
      .into(VehicleEntity)
      .values(entities)
      .orUpdate({
        conflict_target: ['externalId'],
        overwrite: ['name', 'shortDescription', 'description', 'image'],
      })
      .execute();

    return newVehicles.raw;
  }

  async findAll(query): Promise<FindVehiclesDto> {
    const qb = await this.vehicleRepository
      .createQueryBuilder()
      .select([
        'vehicle.id',
        'vehicle.name',
        'vehicle.shortDescription',
        'vehicle.image',
      ])
      .from(VehicleEntity, 'vehicle');

    qb.orderBy('vehicle.name', 'ASC');

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const [vehicles, count] = await qb.getManyAndCount();

    return { vehicles: plainToClass(SimpleVehicleDto, vehicles), count };
  }

  async findOne(id: number): Promise<DetailsVehicleDto> {
    const vehicle = await this.vehicleRepository.findOne({ id });

    return plainToClass(DetailsVehicleDto, await vehicle);
  }
}
