import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    orderForm: FormGroup;
    constructor() {}

    ngOnInit() {
        this.orderForm = new FormGroup({
            location: new FormControl(null, [Validators.required]),
            startDate: new FormControl(null, [Validators.required]),
            startTime: new FormControl(null, [Validators.required]),
            endDate: new FormControl(null, [Validators.required]),
            endTime: new FormControl(null, [Validators.required]),
            
        });
    }
}
