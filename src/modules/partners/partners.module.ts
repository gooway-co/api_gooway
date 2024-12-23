import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Partners, PartnersSchema } from './schema/partners.schema';
import { PartnerController } from './partners.controller';
import { PartnerService } from './partners.service';
import { AuthService } from '../auth/auth.service';

@Module({
    imports:[ 
        MongooseModule.forFeature([
            { name: Partners.name, schema: PartnersSchema },
        ]),
        
    ],
    controllers: [PartnerController],
    providers: [PartnerService]

})
export class PartnerModule {}
