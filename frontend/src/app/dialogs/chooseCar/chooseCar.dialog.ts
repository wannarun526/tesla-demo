import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarListResp } from 'src/app/interfaces/api.model';


@Component({
    selector: 'dialog-chooseCar',
    templateUrl: 'chooseCar.dialog.html',
})
export class ChooseCarDialog{

    model: string = "";
    chargeType: string = "";
    spec: string = "";

  	constructor(
        public dialogRef: MatDialogRef<ChooseCarDialog>,
        @Inject(MAT_DIALOG_DATA) public data: CarListResp[]
    ) { }

    onClose(){
        this.dialogRef.close();
    }

    onSelect(car: CarListResp){
        this.dialogRef.close(car);
    }
}
