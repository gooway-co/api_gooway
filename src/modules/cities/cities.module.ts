import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cities, CitiesSchema } from './schema/cities.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cities.name, schema: CitiesSchema },
  ]),
  ],
  controllers: [CitiesController],
  providers: [CitiesService]
})
export class CitiesModule {}
