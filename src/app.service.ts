import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import config from 'src/config';

@Injectable()
export class AppService {
    constructor(
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
    ) {}

    getHello(): string {
        console.log(this.configService.apiKey);
        console.log(this.configService.database.name);
        return 'Hello World!';
    }
}
