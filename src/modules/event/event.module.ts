import { Module } from '@nestjs/common';
import { EventsService } from './event.service';
import { EventsController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Events, EventsSchema } from './schema/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Events.name, schema: EventsSchema },
  ]),
  ],
  providers: [EventsService],
  controllers: [EventsController]
})
export class EventModule {}
