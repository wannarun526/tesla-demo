import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiService } from './api.service';

export const emailRule =
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
export const genderRule = /^(?:male|female)$/;
export const roleRule = /^(?:user|partner)$/;
export const cellphoneRule = /^09[0-9]{8}$/;
export const verifyCodeRult = /^[0-9]{6}$/;
export const base64Rule =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

@Injectable({ providedIn: 'root' })
export class UtilService {
    constructor(private apiService: ApiService) {}

    checkTwID = (): ((AbstractControl) => ValidationErrors | null) => {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value) {
                // 建立字母分數陣列(A~Z)
                const city = new Array(
                    1,
                    10,
                    19,
                    28,
                    37,
                    46,
                    55,
                    64,
                    39,
                    73,
                    82,
                    2,
                    11,
                    20,
                    48,
                    29,
                    38,
                    47,
                    56,
                    65,
                    74,
                    83,
                    21,
                    3,
                    12,
                    30
                );
                let id = control.value.toUpperCase();
                // 使用「正規表達式」檢驗格式
                if (id.search(/^[A-Z](1|2)\d{8}$/i) == -1) {
                    return { isMatching: false };
                } else {
                    // 將字串分割為陣列(IE必需這麼做才不會出錯)
                    id = id.split('');
                    // 計算總分
                    let total = city[id[0].charCodeAt(0) - 65];
                    for (let i = 1; i <= 8; i++) {
                        total += eval(id[i]) * (9 - i);
                    }
                    // 補上檢查碼(最後一碼)
                    total += eval(id[9]);
                    // 檢查比對碼(餘數應為0);
                    return total % 10 === 0 ? null : { isMatching: false };
                }
            }
        };
    };

    pwdMatch = (
        matchTo: string
    ): ((AbstractControl) => ValidationErrors | null) => {
        return (control: AbstractControl): ValidationErrors | null => {
            return control &&
                control.parent &&
                control.value === control.parent.value[matchTo]
                ? null
                : { isMatching: false };
        };
    };

    onFileToBase64(file: File): Promise<string> {
        const result_base64 = new Promise<string>((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = () => {
                const convertResult = fileReader.result as string;
                resolve(convertResult);
            };
            fileReader.readAsDataURL(file);
        });

        return result_base64;
    }

    async createImageFromBlob(path: string, ownerId: string): Promise<string> {
        const result = new Promise<string>(async (resolve) => {
            const fileBlob: Blob = await this.apiService
                .GetFile(path, ownerId)
                .toPromise();
            let reader = new FileReader();
            reader.addEventListener(
                'load',
                () => {
                    const convertResult = reader.result as string;
                    resolve(convertResult);
                },
                false
            );

            if (fileBlob) {
                reader.readAsDataURL(fileBlob);
            }
        });
        return result;
    }
}
