import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface VehicleLicense {
    vl01: string,
    vl02: string,
}

@Component({
    selector: 'dialog-vehicleLicense',
    templateUrl: 'vehicleLicense.dialog.html',
})
export class VehicleLicenseDialog implements OnInit{

  	constructor(
        private dialogRef: MatDialogRef<VehicleLicenseDialog>,
        @Inject(MAT_DIALOG_DATA) public data: VehicleLicense
    ) {}

    ngOnInit() {
        
    }

    onClose(){
        this.dialogRef.close();
    }

}
