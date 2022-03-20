import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterTypeDialog } from 'src/app/dialogs/registerType/registerType.dialog';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit{

    constructor(
        private dialog: MatDialog,
	    private router: Router,
    ) {}

	ngOnInit(){

	}

    onShowTypeDialog(){
        const typeDialog = this.dialog.open(RegisterTypeDialog)

        typeDialog.afterClosed().subscribe((type: 'user' | 'partner') => {
            type && this.router.navigate(['register', type]);
        });
    }
}
