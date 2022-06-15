import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { BasicInfoDialog } from 'src/app/dialogs/basicInfo/basicInfo.dialog';
import { PicDemoDialog } from 'src/app/dialogs/picDemo/picDemo.dialog';
import { UploadDocsDialog } from 'src/app/dialogs/uploadDocs/uploadDocs.dialog';
import { CarCreateReq, CarCreateResp } from 'src/app/interfaces/api.model';
import { InsuranceInfo, insuranceMap } from 'src/app/interfaces/insurance.map';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
    selector: 'app-addTesla',
    templateUrl: './addTesla.component.html',
})
export class AddTeslaComponent implements OnInit {
    step = 0;
    checkedContract = false;
    carInfoForm: FormGroup;
    insuranceForm: FormGroup;
    insuranceMap = insuranceMap;
    editingInsurance = new InsuranceInfo();
    deleteIdList = {};
    checkingDelete = false;
    base64 = {};

    constructor(
        private dialog: MatDialog,
        private utilService: UtilService,
        private apiService: ApiService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.carInfoForm = new FormGroup({
            model: new FormControl(null, [Validators.required]),
            chargeType: new FormControl(null, [Validators.required]),
            spec: new FormControl(null, [Validators.required]),
            year: new FormControl(null, [Validators.required]),
            season: new FormControl(null, [Validators.required]),
            carNumber: new FormControl(null, [Validators.required]),
            vl01: new FormControl(null, [Validators.required]),
            vl02: new FormControl(null, [Validators.required]),
            car01: new FormControl(null, [Validators.required]),
            car02: new FormControl(null, [Validators.required]),
            car03: new FormControl(null, [Validators.required]),
            car04: new FormControl(null, [Validators.required]),
            car05: new FormControl(null, [Validators.required]),
            car06: new FormControl(null, [Validators.required]),
            car07: new FormControl(null, [Validators.required]),
            car08: new FormControl(null, [Validators.required]),
            car09: new FormControl(null, [Validators.required]),
        });

        this.insuranceForm = new FormGroup({
            carPrice: new FormControl(null, [Validators.required]),
            insuranceArray: new FormArray([], [Validators.required]),
            sumAssured: new FormControl(null, [Validators.required]),
            insurancePDF: new FormControl(null, [Validators.required]),
        });
    }

    onSubmitStep0(): void {
        if (this.checkedContract) {
            this.step++;
        }
    }

    onSubmitStep1(): void {
        if (this.carInfoForm.valid) {
            this.step++;
        }
    }

    onSubmitStep2(): void {
        if (this.insuranceForm.valid) {
            this.step++;
        }
    }

    onSubmitStep3(): void {
        if (
            this.checkedContract &&
            this.carInfoForm.valid &&
            this.insuranceForm.valid
        ) {
            const req: CarCreateReq = {
                model: this.carInfoForm.value.model,
                chargeType: this.carInfoForm.value.chargeType,
                spec: this.carInfoForm.value.spec,
                year: parseInt(this.carInfoForm.value.year, 10),
                season: parseInt(this.carInfoForm.value.season, 10),
                carNumber: this.carInfoForm.value.carNumber,
                insuranceStartDate: this.insuranceForm.value.insuranceStartDate,
                insuranceEndDate: this.insuranceForm.value.insuranceEndDate,
                replaceValue: parseInt(
                    this.insuranceForm.value.replaceValue,
                    10
                ),
                insuranceCompany: this.insuranceForm.value.insuranceCompany,
                insuranceType: this.insuranceForm.value.insuranceType,
                sumAssured: parseInt(this.insuranceForm.value.sumAssured, 10),
            };
            this.apiService
                .CarCreate(req)
                .pipe(
                    mergeMap((resp: CarCreateResp) => {
                        const allRequests: Promise<void>[] = [];
                        for (const key of Object.keys(this.carInfoForm.value)) {
                            const item = this.carInfoForm.value[key];
                            if (item instanceof File) {
                                const base64Split =
                                    this.base64[key]?.split('base64,');
                                allRequests.push(
                                    this.apiService
                                        .FileCarUpload({
                                            carId: resp.carId,
                                            docName: (item as File).name,
                                            docType:
                                                key === 'vl01' ||
                                                key === 'vl02' ||
                                                key === 'car01' ||
                                                key === 'car02' ||
                                                key === 'car03' ||
                                                key === 'car04' ||
                                                key === 'car05' ||
                                                key === 'car06' ||
                                                key === 'car07' ||
                                                key === 'car08' ||
                                                key === 'car09'
                                                    ? key
                                                    : 'vl01',
                                            docContent: base64Split[1],
                                            mimeType: base64Split[0],
                                        })
                                        .toPromise()
                                );
                            }
                        }
                        return combineLatest(allRequests);
                    })
                )
                .subscribe(
                    () => {
                        this.router.navigate(['userInfo']);
                    },
                    (error: HttpErrorResponse) => {
                        this.dialog.open(BasicInfoDialog, {
                            data: {
                                line1: error.error.errorMsg || error.message,
                                line2: '請重新操作',
                            },
                        });
                    }
                );
        }
    }

    onAddInsurance(): void {
        const newInsuranceInfo = new FormGroup({
            insuranceStartDate: new FormControl(
                this.editingInsurance.insuranceStartDate,
                [Validators.required]
            ),
            insuranceEndDate: new FormControl(
                this.editingInsurance.insuranceStartDate,
                [Validators.required]
            ),
            insuranceCompany: new FormControl(
                this.editingInsurance.insuranceCompany,
                [Validators.required]
            ),
            insurancePrice: new FormControl(
                this.editingInsurance.insurancePrice,
                [Validators.required, Validators.pattern(/\d/)]
            ),
            insuranceType: new FormControl(
                this.editingInsurance.insuranceOtherType ||
                    this.editingInsurance.insuranceType,
                [Validators.required]
            ),
        });

        if (newInsuranceInfo.valid) {
            (this.insuranceForm.get('insuranceArray') as FormArray).push(
                newInsuranceInfo
            );
            this.editingInsurance = new InsuranceInfo();
        }
    }

    onInsuranceCheck(event: any, value: number): void {
        if (event.currentTarget.checked) {
            this.deleteIdList[value] = true;
        } else {
            delete this.deleteIdList[value];
        }
    }

    onDeleteInsurance(): void {
        const deleteIdList = this.deleteIdList;
        Object.keys(deleteIdList).forEach((id) => {
            (this.insuranceForm.get('insuranceArray') as FormArray).removeAt(
                Number(id)
            );
        });
        this.deleteIdList = {};
        this.checkingDelete = false;
    }

    onShowPicDemo(): void {
        this.dialog.open(PicDemoDialog, {
            height: '90%',
        });
    }

    onOpenUploadDocs(): void {
        const uploadDocRef = this.dialog.open(UploadDocsDialog, {
            width: '90%',
            data: {
                vl01: this.carInfoForm.value.vl01,
                vl02: this.carInfoForm.value.vl02,
            },
        });

        uploadDocRef.afterClosed().subscribe(async (result) => {
            if (result) {
                this.carInfoForm.patchValue({
                    vl01: result.vl01,
                    vl02: result.vl02,
                });
                this.base64['vl01'] = result.vl01
                    ? await this.utilService.onFileToBase64(result.vl01)
                    : null;
                this.base64['vl02'] = result.vl02
                    ? await this.utilService.onFileToBase64(result.vl02)
                    : null;
            }
        });
    }

    async onUploadCarPic(field: string, file: File): Promise<void> {
        if (this.carInfoForm.get(field)) {
            this.carInfoForm.get(field).setValue(file);
            this.base64[field] = await this.utilService.onFileToBase64(file);
        }
    }

    async onUploadPDF(field: string, file: File): Promise<void> {
        if (this.insuranceForm.get(field)) {
            this.insuranceForm.get(field).setValue(file);
            this.base64[field] = await this.utilService.onFileToBase64(file);
        }
    }

    onBackToPartner(): void {
        this.router.navigate(['userInfo']);
    }
}
