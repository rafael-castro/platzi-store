import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
