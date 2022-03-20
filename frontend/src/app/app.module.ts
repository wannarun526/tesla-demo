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
import { SecToMinPipe } from './pipes/timer.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicInfoDialog } from './dialogs/basicInfo/basicInfo.dialog';
import { UploadDocsDialog } from './dialogs/uploadDocs/uploadDocs.dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DATE_FORMATS } from './interfaces/date.model';

const routes: Routes = [
	{ path: '', component: HomeComponent},
	{ path: 'login', component: LoginComponent},
	{ path: 'register', component: RegisterComponent},
	{ path: 'userInfo', component: UserInfoComponent},
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
		//#endregion

		//#region Layouts
		HeaderComponent,
		FooterComponent,
		//#endregion

		//#region Pipes
		SecToMinPipe,
		//#endregion

		//#region Dialogs
		BasicInfoDialog,
		UploadDocsDialog,
		//#endregion
    ],
    imports: [
		RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		HttpClientModule,
    	FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
    	MatDialogModule,
		MatDatepickerModule,
    ],
    providers: [
    	{ provide: HTTP_INTERCEPTORS, useClass: TokenIntercept, multi: true, },
		{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    	{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
	],
    bootstrap: [AppComponent]
})
export class AppModule { }
