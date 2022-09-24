import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    providers: [
        {
            provide: 'API_KEY',
            useValue: process.env.NODE_ENV === 'prod' ? 'PROD' : 'DEV',
        },
    ],
    exports: ['API_KEY'],
})
export class DatabaseModule {}
