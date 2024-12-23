export type CitiesDocument = Cities & Document;
export declare class Cities {
    name: string;
    description: string;
}
export declare const CitiesSchema: import("mongoose").Schema<Cities, import("mongoose").Model<Cities, any, any, any, import("mongoose").Document<unknown, any, Cities> & Cities & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cities, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Cities>> & import("mongoose").FlatRecord<Cities> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
