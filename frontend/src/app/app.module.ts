import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { LoginComponent } from './main/login/login.component';
import { RegisterComponent } from './main/register/register.component';
import { UserInfoComponent } from './main/userInfo/userInfo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenIntercept } from './services/tokenIntercept.service';
import { CarFilterPipe, GenderPipe, HourToDayPipe } from './pipes/data.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicInfoDialog } from './dialogs/basicInfo/basicInfo.dialog';
import { UploadDocsDialog } from './dialogs/uploadDocs/uploadDocs.dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DATE_FORMATS } from './interfaces/date.model';
import { RegisterTypeDialog } from './dialogs/registerType/registerType.dialog';

import { RecaptchaFormsModule, RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { LoginGuard } from './auth/login.guard';
import { ForgetPwdDialog } from './dialogs/forgetPwd/forgetPwd.dialog';
import { AddTeslaComponent } from './main/addTesla/addTesla.component';
import { PicDemoDialog } from './dialogs/picDemo/picDemo.dialog';
import { VehicleLicenseDialog } from './dialogs/vehicleLicense/vehicleLicense.dialog';
import { FailedReasonDialog } from './dialogs/failedReason/failedReason.dialog';
import { BookingComponent } from './main/booking/booking.component';
import { ChooseCarDialog } from './dialogs/chooseCar/chooseCar.dialog';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './main/order/order.component';
import { BookingDoneComponent } from './main/bookingDone/bookingDone.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, canActivate: [LoginGuard]},
	{ path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
	{ path: 'register/user', component: RegisterComponent, canActivate: [LoginGuard]},
	{ path: 'register/partner', component: RegisterComponent, canActivate: [LoginGuard]},
	{ path: 'userInfo', component: UserInfoComponent, canActivate: [LoginGuard]},
	{ path: 'addTesla', component: AddTeslaComponent, canActivate: [LoginGuard]},
	{ path: 'booking', component: BookingComponent, canActivate: [LoginGuard]},
	{ path: 'order', component: OrderComponent, canActivate: [LoginGuard]},
	{ path: 'bookingDone', component: BookingDoneComponent, canActivate: [LoginGuard]},
	{ path: '**', redirectTo: "/"},
];

@NgModule({
    declarations: [
		//#region Main page

      	AppComponent,
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		UserInfoComponent,
		AddTeslaComponent,
		BookingComponent,
		OrderComponent,
		BookingDoneComponent,
		//#endregion

		//#region Layouts
		HeaderComponent,
		FooterComponent,
		//#endregion

		//#region Pipes
		GenderPipe,
		HourToDayPipe,
		CarFilterPipe,
		//#endregion

		//#region Dialogs
		BasicInfoDialog,
		UploadDocsDialog,
		RegisterTypeDialog,
		ForgetPwdDialog,
		PicDemoDialog,
		VehicleLicenseDialog,
		FailedReasonDialog,
		ChooseCarDialog,
		//#endregion
    ],
    imports: [
		RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		HttpClientModule,
		CommonModule,
    	FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
    	MatDialogModule,
		MatDatepickerModule,
		
		RecaptchaModule,
		RecaptchaFormsModule,
    ],
    providers: [
    	{ provide: HTTP_INTERCEPTORS, useClass: TokenIntercept, multi: true, },
		{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    	{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
		{ provide: RECAPTCHA_SETTINGS, useValue: { siteKey: environment.recaptchaKey, } as RecaptchaSettings, },
		LoginGuard,
	],
    bootstrap: [AppComponent]
})
export class AppModule { }
