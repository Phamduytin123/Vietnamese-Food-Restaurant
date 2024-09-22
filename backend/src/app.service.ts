import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getInit(): string {
        return 'Vietnamese food restaurant server';
    }
}
