import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'dialog-picDemo',
    templateUrl: 'picDemo.dialog.html',
})
export class PicDemoDialog implements OnInit{

  	constructor(
        private dialogRef: MatDialogRef<PicDemoDialog>,
    ) {}

    ngOnInit() {
        
    }

    onClose(){
        this.dialogRef.close();
    }

}
