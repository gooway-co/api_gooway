import { IsNotEmpty, IsOptional } from "class-validator";

export class PlaceDTO { 

    @IsOptional()
    description: string;

    @IsNotEmpty()
    name: string;

    @IsOptional()
    images: any[];

    @IsNotEmpty()
    longitud: number;

    @IsNotEmpty()
    latitud: number;

    @IsOptional()
    autor?: string;

    @IsOptional() 
    openingDate?: Date;

    @IsOptional() 
    dedication?: string;

    @IsOptional()
    reference?: string; 

    @IsOptional() 
    referencePhoto?: string;

    @IsOptional() 
    mainTypology?: string; 

    @IsOptional() 
    secondaryTypology?: string; 

    @IsOptional() 
    advocacy?: string; 


    @IsNotEmpty()
    status: string;

    @IsOptional() 
    address: string;


    //@IsNotEmpty()
    //companyId: string;
}
