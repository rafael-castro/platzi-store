import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm';

import { Brand } from 'src/products/entities/brand.entity';
import { Category } from 'src/products/entities/category.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 25, unique: true })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'numeric', precision: 6, scale: 2, default: 0.0 })
    price: number;

    @Column({ type: 'int' })
    stock: number;

    @Column({ type: 'varchar' })
    image: string;

    @ManyToOne(() => Brand, (brand) => brand.products)
    brand: Brand;

    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable()
    categories: Category[];

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}
