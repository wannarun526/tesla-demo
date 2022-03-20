import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'dialog-basicInfo',
    templateUrl: 'basicInfo.dialog.html',
})
export class BasicInfoDialog {
  	constructor(
        public dialogRef: MatDialogRef<BasicInfoDialog>,
        @Inject(MAT_DIALOG_DATA) public data: string
    ) {}

    onClose(){
        this.dialogRef.close();
    }
}
