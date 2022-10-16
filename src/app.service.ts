import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './config';

@Injectable()
export class AppService {
    constructor(
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
        @Inject('TASKS') private tasks: any[],
        @Inject('PG_CLIENT') private pgClient: Client,
    ) {}

    getHello(): string {
        console.log(this.configService.apiKey);
        console.log(this.configService.database.name);
        return 'Hello World!';
    }

    getTasks() {
        return new Promise((resolve, reject) => {
            this.pgClient.query('SELECT * FROM tasks', (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res?.rows);
            });
        });
    }
}
