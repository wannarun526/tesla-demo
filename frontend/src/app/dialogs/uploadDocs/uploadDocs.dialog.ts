import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UploadDocsData {
  	id01: string;
    id01DocName: string;
  	id02: string;
  	id02DocName: string;
  	dl01: string;
  	dl01DocName: string;
  	dl02: string;
  	dl02DocName: string;
}

@Component({
    selector: 'dialog-uploadDocs',
    templateUrl: 'uploadDocs.dialog.html',
})
export class UploadDocsDialog {
  	
    constructor(
        private dialogRef: MatDialogRef<UploadDocsDialog>,
        @Inject(MAT_DIALOG_DATA) public data: UploadDocsData
    ) { }

    onClose(isOk: boolean){
        this.dialogRef.close(isOk ? this.data : null);
    }

    async onUploadDoc(docKey: string, file: File){
        this.data[docKey] = await this.onFileToBase64(file);
        this.data[docKey + "DocName"] = file.name;
    }

    private onFileToBase64(file: File): Promise<string> {
        const result_base64 = new Promise<string>((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = () => {
                const convertResult = fileReader.result as string;
                const result = convertResult.split("base64,").pop();
                resolve(result)
            }
            fileReader.readAsDataURL(file);
        });

        return result_base64;
    }
}
