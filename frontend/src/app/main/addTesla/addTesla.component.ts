import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { BasicInfoDialog } from 'src/app/dialogs/basicInfo/basicInfo.dialog';
import { PicDemoDialog } from 'src/app/dialogs/picDemo/picDemo.dialog';
import { UploadDocsDialog } from 'src/app/dialogs/uploadDocs/uploadDocs.dialog';
import { CarCreateReq, CarCreateResp } from 'src/app/interfaces/api.model';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
    selector: 'app-addTesla',
    templateUrl: './addTesla.component.html',
})
export class AddTeslaComponent implements OnInit{

    step: number = 0;
    checkedContract: boolean = false;
    carInfoForm: FormGroup;
    insuranceForm: FormGroup;
    base64 = {};
    
    constructor(
        private dialog: MatDialog,
        private utilService: UtilService,
        private apiService: ApiService,
        private router: Router,
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
            "car01": new FormControl(null, [Validators.required]),
            "car02": new FormControl(null, [Validators.required]),
            "car03": new FormControl(null, [Validators.required]),
            "car04": new FormControl(null, [Validators.required]),
            "car05": new FormControl(null, [Validators.required]),
            "car06": new FormControl(null, [Validators.required]),
            "car07": new FormControl(null, [Validators.required]),
            "car08": new FormControl(null, [Validators.required]),
            "car09": new FormControl(null, [Validators.required]),
        })

        this.insuranceForm = new FormGroup({
            "insuranceStartDate": new FormControl(null, [Validators.required]),
            "insuranceEndDate": new FormControl(null, [Validators.required]),
            "replaceValue": new FormControl(null, [Validators.required]),
            "insuranceCompany": new FormControl(null, [Validators.required]),
            "insuranceType": new FormControl(null, [Validators.required]),
            "sumAssured": new FormControl(null, [Validators.required]),
        })
	}

    onSubmitStep0(){
        this.checkedContract && (this.step ++);
    }

    onSubmitStep1(){
        this.carInfoForm.valid && (this.step ++);
    }

    onSubmitStep2(){
        this.insuranceForm.valid && (this.step ++);
    }

    onSubmitStep3(){
        if(this.checkedContract && this.carInfoForm.valid && this.insuranceForm.valid){
            const req: CarCreateReq = {
                model: this.carInfoForm.value.model,
                chargeType: this.carInfoForm.value.chargeType,
                spec: this.carInfoForm.value.spec,
                year: parseInt(this.carInfoForm.value.year, 10),
                season: parseInt(this.carInfoForm.value.season, 10),
                carNumber: this.carInfoForm.value.carNumber,
                insuranceStartDate: this.insuranceForm.value.insuranceStartDate,
                insuranceEndDate: this.insuranceForm.value.insuranceEndDate,
                replaceValue: parseInt(this.insuranceForm.value.replaceValue, 10),
                insuranceCompany: this.insuranceForm.value.insuranceCompany,
                insuranceType: this.insuranceForm.value.insuranceType,
                sumAssured: parseInt(this.insuranceForm.value.sumAssured, 10),
            }
            this.apiService.CarCreate(req)
            .pipe(
                mergeMap((resp: CarCreateResp) =>{
                    const allRequests: Promise<void>[] = []; 
                    for(const key in this.carInfoForm.value){
                        const item = this.carInfoForm.value[key];
                        if(item instanceof File){
                            const base64Split = this.base64[key]?.split("base64,");
                            allRequests.push(
                                this.apiService.FileCarUpload({
                                    carId: resp.carId,
                                    docName: (item as File).name,
                                    docType: 
                                        key === "vl01" || key ==="vl02" || key === "car01" || 
                                        key === "car02" || key === "car03" || key === "car04" ||
                                        key === "car05" || key === "car06" || key === "car07" ||
                                        key === "car08" || key === "car09" ? key : "vl01",
                                    docContent: base64Split[1],
                                    mimeType: base64Split[0]
                                }).toPromise()
                            )
                        }
                    }
                    return combineLatest(allRequests);
                })
            )
            .subscribe(() =>{
                this.router.navigate(["userInfo"])
            }, 
            (error: HttpErrorResponse) => {
                this.dialog.open(BasicInfoDialog, {
                    data: { line1: error.error.errorMsg || error.message, line2: "請重新操作" }
                });
            });
        }
         
    }

    onShowPicDemo(){
        this.dialog.open(PicDemoDialog,{ 
            height: '90%',
        });
    }

    onOpenUploadDocs(){
        const uploadDocRef = this.dialog.open(UploadDocsDialog, {
            width: "90%",
            data: { vl01: this.carInfoForm.value.vl01, vl02: this.carInfoForm.value.vl02 },
        });

        uploadDocRef.afterClosed().subscribe(async result => {
            if(result){
                this.carInfoForm.patchValue({ vl01: result.vl01, vl02: result.vl02 });
                this.base64["vl01"] = result.vl01 ? await this.utilService.onFileToBase64(result.vl01) : null;
                this.base64["vl02"] = result.vl02 ? await this.utilService.onFileToBase64(result.vl02) : null;
            }
        });
    }

    async onUploadCarPic(field: string, file: File){
        if(this.carInfoForm.get(field)){
            this.carInfoForm.get(field).setValue(file);
            this.base64[field] = await this.utilService.onFileToBase64(file);
        }
    }

    onBackToPartner(){
        this.router.navigate(["userInfo"]);
    }
}
