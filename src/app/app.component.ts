import { Component, OnInit, Input }   from '@angular/core';
import { RegserviceService } from './servers/regservice.service';
import { Router } from '@angular/router';

@Component ({
    selector:     'app-component'
    ,templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    
    constructor(public servive:RegserviceService,public router:Router) {
    }
    onLogout(){
this.servive.deleteToken();
this.router.navigate(['/login']);
    }
    ngOnInit() {}
}