import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Categories, CategoriesSchema } from './schema/categories.schema';
import { CategoriController } from './categories.controller';
import { CategoriService } from './categories.service';
import { AwsS3Module } from '../aws/aws-s3.module';


@Module({
    imports:[ 
        MongooseModule.forFeature([
            { name: Categories.name, schema: CategoriesSchema },
        ]),
        AwsS3Module
    ],
    controllers: [CategoriController],
    providers: [CategoriService]

})
export class CategoriModule {}
