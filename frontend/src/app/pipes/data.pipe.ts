import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Gender' })
export class GenderPipe implements PipeTransform {

    transform(gender: "male" | "female"): string {
        if(!gender)
            return ;

        return gender === "male" ? "男" : "女";
    }
}
