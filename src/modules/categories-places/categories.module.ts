import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesPlace, CategoriesPlaceSchema } from './schema/categories.schema';
import { CategoriController } from './categories.controller';
import { CategoriService } from './categories.service';
import { AwsS3Module } from '../aws/aws-s3.module';


@Module({
    imports:[ 
        MongooseModule.forFeature([
            { name: CategoriesPlace.name, schema: CategoriesPlaceSchema },
        ]),
        AwsS3Module
    ],
    controllers: [CategoriController],
    providers: [CategoriService]

})
export class CategoryPlaceModule {}
