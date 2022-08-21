import { IUser } from "./user.interface";
import Config from 'config'

export const getUserNames = (): string[] => {
    const users = Config.get<IUser[]>('users');
    return users.map(item => {
        return item.username;
    });
}