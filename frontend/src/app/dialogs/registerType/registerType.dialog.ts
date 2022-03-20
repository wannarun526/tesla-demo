import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'dialog-registerType',
    templateUrl: 'registerType.dialog.html',
})
export class RegisterTypeDialog {
  	constructor(
        public dialogRef: MatDialogRef<RegisterTypeDialog>
    ) {}

    onClose(type: 'user' | 'partner' | null){
        this.dialogRef.close(type);
    }
}
