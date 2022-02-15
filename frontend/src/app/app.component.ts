import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  	title = 'fundian-front';

	
	constructor(private http: HttpClient) {}

	ngOnInit(){

		console.log("NONONO")
		this.http.post(`${baseUrl}/auth/test`, null)
		.subscribe((resp: any) => {
			console.log(resp)
			this.title = resp.data
		})
	}
}
