import { IsString, IsNotEmpty, IsDateString } from 'class-validator'
import { OrderCreateReq } from '../models/order'

/**
 * 新增訂單
 */
export class OrderCreateDto implements OrderCreateReq {
    @IsString({ message: 'carId should be string' })
    @IsNotEmpty({ message: 'carId is required' })
    carId!: string

    @IsString({ message: 'location should be string' })
    @IsNotEmpty({ message: 'location is required' })
    location!: string

    @IsDateString({ message: 'endDate should be date' })
    @IsNotEmpty({ message: 'endDate is required' })
    startDate!: Date

    @IsDateString({ message: 'endDate should be date' })
    @IsNotEmpty({ message: 'endDate is required' })
    endDate!: Date
}
