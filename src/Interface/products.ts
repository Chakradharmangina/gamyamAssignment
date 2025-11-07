
export interface IProduct {
    id: number;
    name: string;
    price: number,
    category: string,
    stock: number,
    description: string,
    createdAt: string,
    isActive: boolean,
    tags: string[];
}