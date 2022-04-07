import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PicDemoDialog } from 'src/app/dialogs/picDemo/picDemo.dialog';
import { UploadDocsDialog } from 'src/app/dialogs/uploadDocs/uploadDocs.dialog';

@Component({
    selector: 'app-addTesla',
    templateUrl: './addTesla.component.html',
})
export class AddTeslaComponent implements OnInit{

    step: number = 0;
    checkedContract: boolean = false;
    carInfoForm: FormGroup;
    
    constructor(
        private dialog: MatDialog,
    ) {}

	ngOnInit(){
        this.carInfoForm = new FormGroup({
            "model": new FormControl(null, [Validators.required]),
            "chargeType": new FormControl(null, [Validators.required]),
            "spec": new FormControl(null, [Validators.required]),
            "year": new FormControl(null, [Validators.required]),
            "season": new FormControl(null, [Validators.required]),
            "carNumber": new FormControl(null, [Validators.required]),
            "vl01": new FormControl(null, [Validators.required]),
            "vl02": new FormControl(null, [Validators.required]),
        })
	}

    onSubmitStep0(){
        this.checkedContract && (this.step ++);
    }

    onSubmitStep1(){

        console.log(this.carInfoForm.value);

    }

    onShowPicDemo(){
        this.dialog.open(PicDemoDialog,{ 
            height: '90%',
        });
    }

    onOpenUploadDocs(){
        const uploadDocRef = this.dialog.open(UploadDocsDialog, {
            data: { vl01: this.carInfoForm.value.vl01, vl02: this.carInfoForm.value.vl02 },
        });

        uploadDocRef.afterClosed().subscribe(result => {
            result && this.carInfoForm.patchValue({ vl01: result.vl01, vl02: result.vl02 })
        });
    }
}
