import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomersService } from 'src/customers/services/customers.service';
import { CreateCustomerDto } from 'src/customers/dtos/customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {}

    @Post()
    createCustomer(@Body() payload: CreateCustomerDto) {
        this.customersService.create(payload);
    }
}
