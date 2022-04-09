import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/util.service';

export interface UploadDocsData {
    vl01: File,
    vl02: File,
}

@Component({
    selector: 'dialog-uploadDocs',
    templateUrl: 'uploadDocs.dialog.html',
})
export class UploadDocsDialog implements OnInit{

    base64 = { vl01: null, vl02: null };
  	
    constructor(
        private dialogRef: MatDialogRef<UploadDocsDialog>,
        private utilService: UtilService,
        @Inject(MAT_DIALOG_DATA) public data: UploadDocsData
    ) { }

    async ngOnInit() {
        this.base64 = {
            vl01: this.data?.vl01 && await this.utilService.onFileToBase64(this.data.vl01),
            vl02: this.data?.vl02 && await this.utilService.onFileToBase64(this.data.vl02),
        };
    }

    onClose(isOk: boolean){
        this.dialogRef.close(isOk ? this.data : null);
    }

    async onUploadDoc(docKey: "vl01" | "vl02", file: File){
        this.data[docKey] = file;
        this.base64[docKey] = await this.utilService.onFileToBase64(file);
    }
}
