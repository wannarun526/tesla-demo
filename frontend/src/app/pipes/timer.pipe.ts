import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'momnet';

@Pipe({ name: 'SecToMin' })
export class SecToMinPipe implements PipeTransform {

    transform(sec: number): string {
        return moment.utc(sec*1000).format('mm:ss') as string;
    }
}
