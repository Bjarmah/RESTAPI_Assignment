export interface User {
    id: number;
    username: string;
    email: string;
    createdAt: Date;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    descritpion: string;
    userId: number;
    createdAt: Date;
}