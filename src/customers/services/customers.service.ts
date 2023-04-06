import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from 'src/customers/entities/customer.entity';
import { CreateCustomerDto, CustomerId } from 'src/customers/dtos/customer.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) {}

    async find() {
        return await this.customerRepository.find();
    }

    async findOne(id: CustomerId) {
        const customer = await this.customerRepository.findOneBy({ id });
        if (!customer) {
            throw new NotFoundException(`customer ${id} not found`);
        }
        return customer;
    }

    create(payload: CreateCustomerDto) {
        const newCustomer = this.customerRepository.create(payload);
        this.customerRepository.save(newCustomer);
    }
}
