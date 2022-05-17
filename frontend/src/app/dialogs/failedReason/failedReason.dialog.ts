import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'dialog-failedReason',
    templateUrl: 'failedReason.dialog.html',
})
export class FailedReasonDialog implements OnInit{

  	constructor(
        private dialogRef: MatDialogRef<FailedReasonDialog>,
        @Inject(MAT_DIALOG_DATA) public data: string
    ) {}

    ngOnInit() {
        
    }

    onClose(){
        this.dialogRef.close();
    }

}
