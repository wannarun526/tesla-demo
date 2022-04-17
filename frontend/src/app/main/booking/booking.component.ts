import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';

export interface BookingState{
    location: string;
    startDate: Date;
    endDate: Date;
    rentHours: number;
}

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
})
export class BookingComponent implements OnInit {

    state: BookingState; 
    
    constructor(
        private router: Router,
        private apiService: ApiService,
    ) {
        this.state = this.router.getCurrentNavigation().extras.state as BookingState;
    }

    ngOnInit() {

        if(!this.state){
            return this.router.navigate(["/"]);
        }

        this.state.startDate = moment(this.state.startDate).toDate();
        this.state.endDate = moment(this.state.endDate).toDate();
        this.state.rentHours = Math.abs(moment.duration(moment(this.state.startDate).diff(this.state.endDate)).asHours());

    }

}
