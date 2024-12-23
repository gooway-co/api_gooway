export type UserDocument = User & Document;
export declare class User {
    email: string;
    password: string;
    name: string;
    lastName: string;
    birthday: Date;
    school: string;
    note: string;
    interests: [];
    musical: string;
    nationality: string;
    status: string;
    city: string;
    rol: string;
    avatar: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
