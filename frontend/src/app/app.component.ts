import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  loggedIn:boolean=false;
  constructor(public authService:AuthService){
    
  }
  ngOnInit(): void {
    this.authService._isLoggedIn$.subscribe(isLoggedIn=>{
      this.loggedIn=isLoggedIn  
    })
  }
}
