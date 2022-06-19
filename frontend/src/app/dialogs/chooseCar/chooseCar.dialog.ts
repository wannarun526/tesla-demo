import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarListResp } from 'src/app/interfaces/api.model';

@Component({
    selector: 'dialog-chooseCar',
    templateUrl: 'chooseCar.dialog.html',
})
export class ChooseCarDialogComponent {
    model = '';
    chargeType = '';
    spec = '';

    constructor(
        public dialogRef: MatDialogRef<ChooseCarDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CarListResp[]
    ) {}

    onClose(): void {
        this.dialogRef.close();
    }

    onSelect(car: CarListResp): void {
        this.dialogRef.close(car);
    }
}
