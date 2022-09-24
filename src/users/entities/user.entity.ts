export enum Role {
    ADMIN = 'admin',
}

export class User {
    id: number;
    email: string;
    password: string;
    role: Role;
}
