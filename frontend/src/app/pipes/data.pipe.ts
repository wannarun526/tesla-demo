import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { CarListResp } from '../interfaces/api.model';

@Pipe({ name: 'Gender' })
export class GenderPipe implements PipeTransform {
    transform(gender: 'male' | 'female'): string {
        switch (gender) {
            case 'male':
                return '男';
            case 'female':
                return '女';
            default:
                return '其他';
        }
    }
}

@Pipe({ name: 'HourToDay' })
export class HourToDayPipe implements PipeTransform {
    transform(rentHours: number): number {
        return Math.floor(rentHours / 24);
    }
}

@Pipe({ name: 'CarFilter' })
export class CarFilterPipe implements PipeTransform {
    transform(
        carList: CarListResp[],
        model: 'Model 3' | 'Model X' | 'Model S',
        chargeType: 'CCS2' | 'TPC',
        spec: 'SR' | 'LR' | 'P'
    ): CarListResp[] {
        return carList.filter(
            (car) =>
                (model ? car.model === model : true) &&
                (chargeType ? car.chargeType === chargeType : true) &&
                (spec ? car.spec === spec : true)
        );
    }
}

@Pipe({ name: 'rentHour' })
export class RentHourPipe implements PipeTransform {
    transform(startDate: string, endDate: string): number {
        return moment
            .duration(moment(endDate).diff(moment(startDate)))
            .asHours();
    }
}
