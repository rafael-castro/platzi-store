import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata): number {
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) {
            throw new BadRequestException(`${value} is not a number`);
        }
        return parsedValue;
    }
}
