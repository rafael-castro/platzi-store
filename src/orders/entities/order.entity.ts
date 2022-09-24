import { Product } from './../../products/entities/product.entity.js';
import { User } from './../../users/entities/user.entity.js';

export class Order {
    date: Date;
    user: User;
    products: Product[];
}
