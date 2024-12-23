import { Injectable } from '@nestjs/common';
import { Favorites, FavoritesDocument } from './schema/favorite.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { FavoriteDTO } from './dtos/favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorites.name)
    private _favoriteModel: Model<FavoritesDocument>,
  ) {}

  async addFavoritePartner(favoriteDTO: FavoriteDTO): Promise<any> {
    try {
      const responsePartner = await this._favoriteModel.findOne({partnerId: new mongo.ObjectId(favoriteDTO.partnerId)});

      if(responsePartner){
        const responsePartner = await this._favoriteModel.deleteOne({partnerId: new mongo.ObjectId(favoriteDTO.partnerId)});

        return {
          data: [responsePartner],
          menssage: 'Eliminastes el negocio de tus favoritos',
          status: 204,
        };
      }

      const response = await new this._favoriteModel(favoriteDTO);
      response.save();

      console.log("responsePartner ", response);


      return {
        data: [response],
        menssage: '',
        status: 200,
      };
    } catch (error) {
      return {
        data: [],
        menssage: error,
        status: 500,
      };
    }
  }

  async listFavoritePartner(userId: string): Promise<any> {
    try {
      const response = await this._favoriteModel.aggregate([
        {
          $match: { userId: new mongo.ObjectId(userId) },
        },
        {
          $lookup: {
            from: 'partners', // Nombre de la colección relacionada
            localField: 'partnerId', // Campo en `favorite` que relaciona con `partners`
            foreignField: '_id', // Campo en `partners` que se relaciona
            as: 'partnerDetails', // Alias para los datos relacionados
          },
        },
        {
          $unwind: '$partnerDetails',
        },
        {
          $addFields: {
            'partnerDetails.favorite': true, // Agregar el campo 'favorite' con valor true
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            partnerId: 1,
            partnerDetails: {
              _id: 1,
              name: 1,
              longitud: 1,
              latitud: 1,
              imagesUrl: 1,
              description: 1,
              status: 1,
              whatsapp: 1,
              phone: 1,
              email: 1,
              link: 1,
              address: 1,
              categoryId: 1,
              favorite: 1, // Asegúrate de proyectar 'favorite' también
            },
          },
        },
      ]);
  
      return {
        data: response.map(item => ({
          favoriteId: item._id,
          partner: item.partnerDetails,
        })),
        message: "Favoritos obtenidos",
        status: 200,
      };
    } catch (error) {
      return {
        data: [],
        message: `Error obteniendo favoritos: ${error.message}`,
        status: 500,
      };
    }
  }
  
  
}
