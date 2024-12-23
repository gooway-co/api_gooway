import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Places, PlacesSchema } from './schema/places.schema';
import { PlaceController } from './places.controller';
import { PlaceService } from './places.service';

@Module({
    imports:[ 
        MongooseModule.forFeature([
            { name: Places.name, schema: PlacesSchema },
        ]),
    ],
    controllers: [PlaceController],
    providers: [PlaceService]

})
export class PlaceModule {}
