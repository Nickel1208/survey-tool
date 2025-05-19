import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findByEmail(email: string): Promise<UserDocument | null>;
    create(email: string, password: string): Promise<UserDocument>;
}
